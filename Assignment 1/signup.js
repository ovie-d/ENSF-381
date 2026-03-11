function showMessage(messageBox, messages, isSuccess) {
    messageBox.className = isSuccess ? "message-box success" : "message-box error";

    if (Array.isArray(messages)) {
        messageBox.innerHTML =  messages.join("<br>");
    } else {
        messageBox.textContent = messages;
    }
}

function validateForm() {
    const username = document.getElementById("username").value.trim();
    const emailRaw = document.getElementById("email").value;
    const email = emailRaw.trim();
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirm-password").value;

    const errors = [];

    const usernamePattern = /^[A-Za-z][A-Za-z0-9_-]{2,19}$/;
    if (!usernamePattern.test(username)) {
        errors.push("Username must be 3-20 characters, start with a letter, and only use letters, numbers, - or _.");
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.(com|net|io)$/i;
    if (/\s/.test(emailRaw)) {
        errors.push("Email cannot contain spaces.");
    } else if (!emailPattern.test(email)) {
        errors.push("Invalid email( Must contain @ and end with .com, .net, or .io );");
    }

    // password checks
    const allowedCharsPattern = /^[A-Za-z0-9!@#$%^&*()\-_=+\[\]{}|;:'",.<>?/`~]+$/;
    const hasMinLength = password.length >= 8;
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecial = /[!@#$%^&*()\-_=+\[\]{}|;:'",.<>?/`~]/.test(password);
    const hasNoSpaces = !/\s/.test(password);
    const hasOnlyAllowedChars = allowedCharsPattern.test(password);

    const isPasswordValid =
        hasMinLength &&
        hasUppercase &&
        hasLowercase &&
        hasNumber &&
        hasSpecial &&
        hasNoSpaces &&
        hasOnlyAllowedChars;

    if (!isPasswordValid) {
        errors.push("Invalid password (Min 8 characters, uppercase, lowercase, number, special character, no spaces)");
    }

    if (password !== confirmPassword) {
        errors.push("Passwords do not match.");
    }

    return errors;
}

const signupForm = document.getElementById("signup-form");
const messageBox = document.getElementById("signup-message-box");

signupForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const errors = validateForm();

    if (errors.length > 0) {
        showMessage(messageBox, errors, false);
        return;
    }

    showMessage(messageBox, "Signup successful! Redirecting to Login...", true);

    setTimeout(function () {
        window.location.href = "login.html";
    }, 1200);
});