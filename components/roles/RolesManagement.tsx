import React, { useState } from 'react';
import RolesTable from '../custom/RolesTable';
import { Role } from '@/types/roles.type';
import EditModal from './EditRolesModal';

const Rolesmanagement = () => {
  const [addingRole, setAddingRole] = useState<Role | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSave = (editedRole: Role) => {
    // Handle save logic here
    setAddingRole(null);
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
          onClick={() => setAddingRole({ id: Date.now(), name: '', description: '', permissions: [] })}
        >
          + Add
        </button>
      </div>
      <RolesTable searchQuery={searchQuery} />
      {addingRole && (
        <EditModal
          title="Add Role"
          role={addingRole}
          onClose={() => setAddingRole(null)}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

export default Rolesmanagement;