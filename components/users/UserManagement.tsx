import React, { useState } from 'react';
import UsersTable from '../custom/UsersTable';
import { User } from '@/types/users.type';
import EditUserModal from './EditUsersModal';

const UserManagement = () => {
  const [addingUser, setAddingUser] = useState<User | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSave = (editedUser: User) => {
    // Handle save logic here
    setAddingUser(null);
  };

  return (
    <div className='w-full'>
      <div className='border-b border-slate-100 h-10'></div>
      <div className="flex justify-between py-10">
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-8 pr-4 py-2 border rounded-md"
        />
        <button
          className="bg-blue-700 text-white px-4 py-2 rounded-md"
          onClick={() => setAddingUser({ id: Date.now(), name: '', email: '', role: '', status: '' })}
        >
          + Add
        </button>
      </div>
      <UsersTable searchQuery={searchQuery} />
      {addingUser && (
        <EditUserModal
          title="Add User"
          user={addingUser}
          onClose={() => setAddingUser(null)}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

export default UserManagement;