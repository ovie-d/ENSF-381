from __future__ import annotations

import json
import random
from datetime import datetime
from pathlib import Path

import bcrypt
from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

USERS = []

ALLOWED_USERNAME_CHARS = set("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_-")
FLAVORS_FILE = Path(__file__).with_name("flavors.json")
REVIEWS_FILE = Path(__file__).with_name("reviews.json")


def find_user_by_email(email: str):
    """Return the first user with a matching email (case-insensitive), or None."""
    normalized = email.strip().lower()
    for user in USERS:
        if user["email"].lower() == normalized:
            return user
    return None


def find_user_by_username(username: str):
    """Return the first user with a matching username, or None."""
    for user in USERS:
        if user["username"] == username:
            return user
    return None


def find_user_by_id(user_id: int):
    """Return the first user with a matching user id, or None."""
    for user in USERS:
        if user["id"] == user_id:
            return user
    return None


def next_user_id() -> int:
    """Compute the next numeric user id for in-memory signup."""
    if not USERS:
        return 1

    max_id = USERS[0]["id"]
    for user in USERS:
        if user["id"] > max_id:
            max_id = user["id"]

    return max_id + 1


def next_order_id(user):
    """Compute the next order id for a specific user."""
    orders = user.get("orders", [])
    if not orders:
        return 1

    max_id = orders[0]["orderId"]
    for order in orders:
        if order["orderId"] > max_id:
            max_id = order["orderId"]

    return max_id + 1


def current_timestamp() -> str:
    """Return a display-friendly timestamp for order history entries."""
    return datetime.now().strftime("%Y-%m-%d %H:%M:%S")


def load_flavors():
    """Load all flavors from flavors.json."""
    try:
        with FLAVORS_FILE.open("r", encoding="utf-8") as file:
            flavors = json.load(file)
    except FileNotFoundError:
        return None, "Flavors file was not found."
    except json.JSONDecodeError:
        return None, "Flavors file contains invalid JSON."

    if not isinstance(flavors, list):
        return None, "Flavors data format is invalid."

    return flavors, None


def load_reviews():
    """Load all reviews from reviews.json."""
    try:
        with REVIEWS_FILE.open("r", encoding="utf-8") as file:
            reviews = json.load(file)
    except FileNotFoundError:
        return None, "Reviews file was not found."
    except json.JSONDecodeError:
        return None, "Reviews file contains invalid JSON."

    if not isinstance(reviews, list):
        return None, "Reviews data format is invalid."

    return reviews, None


def find_flavor_by_id(flavor_id: int):
    """Find a flavor by id from the flavors.json data."""
    flavors, error = load_flavors()
    if error:
        return None, error

    for flavor in flavors:
        if flavor.get("id") == flavor_id:
            return flavor, None

    return None, "Flavor not found."


def convert_price_to_number(price_value):
    """Convert price values like '$5.49' into float 5.49."""
    if isinstance(price_value, (int, float)):
        return float(price_value)

    if not isinstance(price_value, str):
        return None

    cleaned = price_value.strip().replace("$", "")
    try:
        return float(cleaned)
    except ValueError:
        return None


def is_valid_username_format(username: str) -> bool:
    """Check username rules in a step-by-step way for readability."""
    if len(username) < 3 or len(username) > 20:
        return False
    if not username[0].isalpha():
        return False

    for char in username:
        if char not in ALLOWED_USERNAME_CHARS:
            return False

    return True


def is_valid_email_format(email: str) -> bool:
    """Simple email validation for assignment use."""
    if email.count("@") != 1:
        return False

    local_part, domain_part = email.split("@")
    if not local_part or not domain_part:
        return False
    if "." not in domain_part:
        return False

    domain_sections = domain_part.split(".")
    for section in domain_sections:
        if not section:
            return False

    return len(domain_sections[-1]) >= 2


def validate_username(username: str) -> str | None:
    if not isinstance(username, str):
        return "Username must be a string."
    if not is_valid_username_format(username):
        return (
            "Username must be 3-20 characters, start with a letter, and contain only "
            "letters, numbers, underscores, or hyphens."
        )
    return None


def validate_email(email: str) -> str | None:
    if not isinstance(email, str):
        return "Email must be a string."
    if not is_valid_email_format(email):
        return "Invalid email format."
    return None


def validate_password(password: str) -> str | None:
    if not isinstance(password, str):
        return "Password must be a string."
    if len(password) < 8:
        return "Password must be at least 8 characters long."
    has_uppercase = False
    has_lowercase = False
    has_number = False
    has_special = False

    for char in password:
        if char.isupper():
            has_uppercase = True
        elif char.islower():
            has_lowercase = True
        elif char.isdigit():
            has_number = True
        else:
            has_special = True

    if not has_uppercase:
        return "Password must contain at least one uppercase letter."
    if not has_lowercase:
        return "Password must contain at least one lowercase letter."
    if not has_number:
        return "Password must contain at least one number."
    if not has_special:
        return "Password must contain at least one special character."
    return None


@app.route("/signup", methods=["POST"])
def signup():
    data = request.get_json(silent=True)
    if not isinstance(data, dict):
        return jsonify({"success": False, "message": "Invalid JSON payload."})

    username = data.get("username")
    email = data.get("email")
    password = data.get("password")

    if username is None or email is None or password is None:
        return jsonify(
            {
                "success": False,
                "message": "Username, email, and password are required.",
            }
        )

    username = username.strip() if isinstance(username, str) else username
    email = email.strip().lower() if isinstance(email, str) else email

    username_error = validate_username(username)
    if username_error:
        return jsonify({"success": False, "message": username_error})

    email_error = validate_email(email)
    if email_error:
        return jsonify({"success": False, "message": email_error})

    password_error = validate_password(password)
    if password_error:
        return jsonify({"success": False, "message": password_error})

    if find_user_by_username(username):
        return jsonify({"success": False, "message": "Username is already taken."})

    if find_user_by_email(email):
        return jsonify({"success": False, "message": "Email is already registered."})

    password_hash = bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt()).decode("utf-8")

    new_user = {
        "id": next_user_id(),
        "username": username,
        "email": email,
        "password_hash": password_hash,
        "cart": [],
        "orders": [],
        "created_at": current_timestamp(),
    }
    USERS.append(new_user)

    return jsonify({"success": True, "message": "Registration successful."})


@app.route("/login", methods=["POST"])
def login():
    data = request.get_json(silent=True)
    if not isinstance(data, dict):
        return jsonify({"success": False, "message": "Invalid JSON payload."})

    username = data.get("username")
    password = data.get("password")

    if not isinstance(username, str) or not isinstance(password, str):
        return jsonify(
            {
                "success": False,
                "message": "Username and password are required.",
            }
        )

    username = username.strip()
    user = find_user_by_username(username)

    if not user:
        return jsonify({"success": False, "message": "Invalid username or password."})

    stored_hash = user.get("password_hash", "")
    password_ok = bcrypt.checkpw(password.encode("utf-8"), stored_hash.encode("utf-8"))

    if not password_ok:
        return jsonify({"success": False, "message": "Invalid username or password."})

    return jsonify(
        {
            "success": True,
            "message": "Login successful.",
            "userId": user["id"],
            "username": user["username"],
        }
    )


@app.route("/flavors", methods=["GET"])
def get_flavors():
    flavors, error = load_flavors()
    if error:
        return jsonify({"success": False, "message": error})

    return jsonify(
        {
            "success": True,
            "message": "Flavors loaded.",
            "flavors": flavors,
        }
    )


@app.route("/cart", methods=["GET"])
def get_cart():
    user_id_raw = request.args.get("userId")
    if user_id_raw is None:
        return jsonify({"success": False, "message": "userId is required."})

    try:
        user_id = int(user_id_raw)
    except ValueError:
        return jsonify({"success": False, "message": "userId must be a number."})

    user = find_user_by_id(user_id)
    if not user:
        return jsonify({"success": False, "message": "User not found."})

    return jsonify({"success": True, "message": "Cart loaded.", "cart": user["cart"]})


@app.route("/cart", methods=["POST"])
def add_to_cart():
    data = request.get_json(silent=True)
    if not isinstance(data, dict):
        return jsonify({"success": False, "message": "Invalid JSON payload."})

    user_id = data.get("userId")
    flavor_id = data.get("flavorId")

    if user_id is None or flavor_id is None:
        return jsonify({"success": False, "message": "userId and flavorId are required."})

    try:
        user_id = int(user_id)
        flavor_id = int(flavor_id)
    except ValueError:
        return jsonify({"success": False, "message": "userId and flavorId must be numbers."})

    user = find_user_by_id(user_id)
    if not user:
        return jsonify({"success": False, "message": "User not found."})

    flavor, flavor_error = find_flavor_by_id(flavor_id)
    if flavor_error:
        if flavor_error == "Flavor not found.":
            return jsonify({"success": False, "message": flavor_error})
        return jsonify({"success": False, "message": flavor_error})

    for cart_item in user["cart"]:
        if cart_item["flavorId"] == flavor_id:
            return jsonify(
                {
                    "success": False,
                    "message": "Flavor already in cart. Use PUT /cart to update quantity.",
                }
            )

    flavor_price = convert_price_to_number(flavor.get("price"))
    if flavor_price is None:
        return jsonify({"success": False, "message": "Flavor price is invalid."})

    cart_item = {
        "flavorId": flavor["id"],
        "name": flavor.get("name", "Unknown Flavor"),
        "price": flavor_price,
        "quantity": 1,
    }
    user["cart"].append(cart_item)

    return jsonify(
        {
            "success": True,
            "message": "Flavor added to cart.",
            "cart": user["cart"],
        }
    )


@app.route("/cart", methods=["PUT"])
def update_cart_quantity():
    data = request.get_json(silent=True)
    if not isinstance(data, dict):
        return jsonify({"success": False, "message": "Invalid JSON payload."})

    user_id = data.get("userId")
    flavor_id = data.get("flavorId")
    quantity = data.get("quantity")

    if user_id is None or flavor_id is None or quantity is None:
        return jsonify({"success": False, "message": "userId, flavorId, and quantity are required."})

    try:
        user_id = int(user_id)
        flavor_id = int(flavor_id)
        quantity = int(quantity)
    except ValueError:
        return jsonify({"success": False, "message": "userId, flavorId, and quantity must be numbers."})

    if quantity < 1:
        return jsonify({"success": False, "message": "Quantity must be at least 1."})

    user = find_user_by_id(user_id)
    if not user:
        return jsonify({"success": False, "message": "User not found."})

    item_found = False
    for cart_item in user["cart"]:
        if cart_item["flavorId"] == flavor_id:
            cart_item["quantity"] = quantity
            item_found = True
            break

    if not item_found:
        return jsonify({"success": False, "message": "Flavor not found in cart."})

    return jsonify(
        {
            "success": True,
            "message": "Cart updated successfully.",
            "cart": user["cart"],
        }
    )


@app.route("/cart", methods=["DELETE"])
def delete_cart_item():
    data = request.get_json(silent=True)
    if not isinstance(data, dict):
        return jsonify({"success": False, "message": "Invalid JSON payload."})

    user_id = data.get("userId")
    flavor_id = data.get("flavorId")

    if user_id is None or flavor_id is None:
        return jsonify({"success": False, "message": "userId and flavorId are required."})

    try:
        user_id = int(user_id)
        flavor_id = int(flavor_id)
    except ValueError:
        return jsonify({"success": False, "message": "userId and flavorId must be numbers."})

    user = find_user_by_id(user_id)
    if not user:
        return jsonify({"success": False, "message": "User not found."})

    new_cart = []
    removed = False
    for cart_item in user["cart"]:
        if cart_item["flavorId"] == flavor_id:
            removed = True
        else:
            new_cart.append(cart_item)

    if not removed:
        return jsonify({"success": False, "message": "Flavor not found in cart."})

    user["cart"] = new_cart

    return jsonify({"success": True, "message": "Flavor removed from cart.", "cart": user["cart"]})


@app.route("/orders", methods=["POST"])
def place_order():
    data = request.get_json(silent=True)
    if not isinstance(data, dict):
        return jsonify({"success": False, "message": "Invalid JSON payload."})

    user_id = data.get("userId")
    if user_id is None:
        return jsonify({"success": False, "message": "userId is required."})

    try:
        user_id = int(user_id)
    except ValueError:
        return jsonify({"success": False, "message": "userId must be a number."})

    user = find_user_by_id(user_id)
    if not user:
        return jsonify({"success": False, "message": "User not found."})

    if not user["cart"]:
        return jsonify({"success": False, "message": "Cart is empty."})

    order_items = []
    order_total = 0.0
    for cart_item in user["cart"]:
        item_copy = {
            "flavorId": cart_item["flavorId"],
            "name": cart_item["name"],
            "price": cart_item["price"],
            "quantity": cart_item["quantity"],
        }
        order_items.append(item_copy)
        order_total += cart_item["price"] * cart_item["quantity"]

    order_total = round(order_total, 2)
    new_order_id = next_order_id(user)

    new_order = {
        "orderId": new_order_id,
        "items": order_items,
        "total": order_total,
        "timestamp": current_timestamp(),
    }

    user["orders"].append(new_order)
    user["cart"] = []

    return jsonify({"success": True, "message": "Order placed successfully.", "orderId": new_order_id})


@app.route("/orders", methods=["GET"])
def get_orders():
    user_id_raw = request.args.get("userId")
    if user_id_raw is None:
        return jsonify({"success": False, "message": "userId is required."})

    try:
        user_id = int(user_id_raw)
    except ValueError:
        return jsonify({"success": False, "message": "userId must be a number."})

    user = find_user_by_id(user_id)
    if not user:
        return jsonify({"success": False, "message": "User not found."})

    return jsonify({"success": True, "message": "Order history loaded.", "orders": user["orders"]})


@app.route("/reviews", methods=["GET"])
def get_reviews():
    reviews, error = load_reviews()
    if error:
        return jsonify({"success": False, "message": error})

    if not reviews:
        return jsonify({"success": True, "message": "Reviews loaded.", "reviews": []})

    if len(reviews) <= 2:
        random_reviews = reviews
    else:
        random_reviews = random.sample(reviews, 2)

    return jsonify({"success": True, "message": "Reviews loaded.", "reviews": random_reviews})





if __name__ == "__main__":
    app.run(debug=True)
