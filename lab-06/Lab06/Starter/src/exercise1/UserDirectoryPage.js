import { useEffect, useState } from 'react';
import Controls from './Controls';
import UserList from './UserList';

function UserDirectoryPage() {
  const [users, setUsers] = useState([]);
  const [sortBy, setSortBy] = useState('id');
  const [viewMode, setViewMode] = useState('grid');

  
  useEffect (() => {
    async function fetchUsers() {
      try {
        const response = await fetch("https://69a1e1882e82ee536fa275f7.mockapi.io/users_api");
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    }
    fetchUsers();
  }, []);

  function handleDeleteClick(userId) {
    console.log('TODO: delete the user with id', userId);
    async function deleteUser() {
      try {
        await fetch(`https://69a1e1882e82ee536fa275f7.mockapi.io/users_api/${userId}`, {
          method: 'DELETE',
        });
        setUsers(users.filter((user) => user.id !== userId));
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    }
  }

  function handleSortByGroupClick() {
    setSortBy('group');
    setUsers((prevUsers) => {
      const sortedUsers = [...prevUsers].sort((a, b) =>
        String(a.user_group).localeCompare(String(b.user_group))
      );
      return sortedUsers;
    });
  }

  function handleSortByIdClick() {
    setSortBy('id');
    setUsers((prevUsers) => {
      const sortedUsers = [...prevUsers].sort((a, b) => Number(a.id) - Number(b.id));
      return sortedUsers;
    });
  }

  function handleViewToggleClick() {
    setViewMode((prevViewMode) => (prevViewMode === 'grid' ? 'list' : 'grid'));
  }

  return (
    <>
      <section className="panel">
        <h1>User Directory</h1>
      </section>

      <section className="panel">
        <h2>Controls</h2>
        <Controls
          onDeleteClick={handleDeleteClick}
          onSortByGroupClick={handleSortByGroupClick}
          onSortByIdClick={handleSortByIdClick}
          onViewToggleClick={handleViewToggleClick}
        />
      </section>

      <section className="panel">
        <h2>All Users</h2>
        <UserList users={users} viewMode={viewMode} />
      </section>
    </>
  );
}

export default UserDirectoryPage;
