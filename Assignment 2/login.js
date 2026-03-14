document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("loginForm");
    const messageBox = document.getElementById("login-message-box");

    if (!loginForm) {
        console.error("Login form not found.");
        return;
    }

    function showMessage(message, isSuccess) {
        messageBox.className = isSuccess ? "message-box success" : "message-box error";
        messageBox.textContent = message;
    }

    loginForm.addEventListener("submit", async function (e) {
        e.preventDefault();

        const username = document.getElementById("username").value.trim();
        const password = document.getElementById("password").value.trim();

        if (!username || !password) {
            showMessage("Please fill all fields.", false);
            return;
        }

        try {
            const response = await fetch("https://jsonplaceholder.typicode.com/users");
            const users = await response.json();

            const matchedUser = users.find(
                user => user.username.toLowerCase() === username.toLowerCase()
            );

            if (!matchedUser) {
                showMessage("Invalid username.", false);
                return;
            }

            if (matchedUser.email !== password) {
                showMessage("Invalid password.", false);
                return;
            }

            showMessage("Login successful! Redirecting...", true);

            setTimeout(function () {
                window.location.href = "menu_view.html";
            }, 1200);

        } catch (error) {
            console.error("Error:", error);
            showMessage("Something went wrong. Please try again.", false);
        }
    });
});