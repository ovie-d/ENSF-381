const userGrid = document.getElementById("userGrid");
const viewToggleBtn = document.getElementById("viewToggleBtn");
const deleteIdInput = document.getElementById("deleteIdInput");
const deleteBtn = document.getElementById("deleteBtn");
const sortByGroupBtn = document.getElementById("sortByGroupBtn");
const sortByIdBtn = document.getElementById("sortByIdBtn");


let users = [];
 async function fetchUsers() {
    try {
        const response = await 
        fetch("https://jsonplaceholder.typicode.com/users");
        users = await response.json();
        renderUsers(users);
    } catch (error) {
        console.error("Error fetching users:", error);
    }
 }