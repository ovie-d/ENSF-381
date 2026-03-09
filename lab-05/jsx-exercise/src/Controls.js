function Delete() {
  return (
    <div>
      <input type="text" placeholder="Enter ID" />
      <button>Delete</button>
    </div>
  );
}

function Controls() {
  return (
    <div>
      <Delete />
      <button>Sort by Group</button>
      <button>Sort by ID</button>
      <button>Grid / List</button>
    </div>
  );
}

export default Controls;
