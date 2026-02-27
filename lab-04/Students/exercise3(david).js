const userGrid = document.getElementById("userGrid");
const viewToggleBtn = document.getElementById("viewToggleBtn");
const deleteIdInput = document.getElementById("deleteIdInput");
const deleteBtn = document.getElementById("deleteBtn");
const sortByGroupBtn = document.getElementById("sortByGroupBtn");
const sortByIdBtn = document.getElementById("sortByIdBtn");


let users = [];
userGrid
 async function fetchUsers() {
    try {
        const response = await 
        fetch("https://69a1e55e2e82ee536fa28467.mockapi.io/users_api");
        users = await response.json();
        renderUsers(users);
        console.log("Fetched users:", users);
    } catch (error) {
        console.error("Error fetching users:", error);
    }
 }

function render(htmlStrings) {
    userGrid.innerHTML = htmlStrings.join("");
}

function renderUsers(users) {
    const templates = users.map(user => `
        <article class="user-card">
            <h3>${user.first_name ?? ""}</h3>
            <p>first_name: ${user.first_name ?? ""}</p>
            <p>user_group: ${user.user_group ?? ""}</p>
            <p>id: ${user.id ?? ""}</p>
        </article>
    `);
    render(templates);
}