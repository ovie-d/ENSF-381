let users = [];

const userGrid = document.getElementById("userGrid");
const viewToggleBtn = document.getElementById("viewToggleBtn");
const deleteIdInput = document.getElementById("deleteIdInput");
const deleteBtn = document.getElementById("deleteBtn");
const sortByGroupBtn = document.getElementById("sortByGroupBtn");
const sortByIdBtn = document.getElementById("sortByIdBtn");

async function retrieveData() {
    try {
        const response = await fetch("https://69a1e1882e82ee536fa275f7.mockapi.io/users_api");
        const data = await response.json();

        users = data;
        console.log("Fetched Users:", users);

        render(users);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

function render(userArray) {
    userGrid.innerHTML = "";

    userArray.forEach(user => {
        userGrid.innerHTML += `
        <article class="user-card">
            <h3>${user.first_name ?? ""}</h3>
            <p>first_name: ${user.first_name ?? ""}</p>
            <p>user_group: ${user.user_group ?? ""}</p>
            <p>id: ${user.id ?? ""}</p>
        </article>
        `;
    });
}

sortByGroupBtn.addEventListener("click", function() {
    users.sort((a, b) => a.user_group - b.user_group);
    render(users);
});

sortByIdBtn.addEventListener("click", function() {
    users.sort((a, b) => Number(a.id) - Number(b.id));
    render(users);
});

viewToggleBtn.addEventListener("click", function() {
    if (userGrid.classList.contains("grid-view")) {
        userGrid.classList.remove("grid-view");
        userGrid.classList.add("list-view");
    } else {
        userGrid.classList.remove("list-view");
        userGrid.classList.add("grid-view");
    }
});

deleteBtn.addEventListener("click", async function() {
    const id = deleteIdInput.value;

    if (!id) {
        console.error("Invalid ID");
        return;
    }

    try {
        const response = await fetch(`https://69a1e1882e82ee536fa275f7.mockapi.io/users_api/${id}`, {
            method: "DELETE"
        });

        if (!response.ok) {
            throw new Error("Delete failed");
        }

        users = users.filter(user => user.id !== id);
        render(users);

    } catch (error) {
        console.error("Error deleting user:", error);
    }
});

retrieveData();