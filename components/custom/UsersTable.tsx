import React,{useState,useMemo} from 'react';
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from '@/components/ui/Table';
import { Pencil, Trash2 } from 'lucide-react';
import { User } from '@/types/users.type';
import EditUserModal from '../users/EditUsersModal';
import usersData from '@/mockData/users.json';
import { UsersTableProps } from '@/types/users.type';

const UsersTable: React.FC<UsersTableProps> = ({ searchQuery }) => {
  const [users, setUsers] = useState<User[]>(usersData);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  const filteredUsers = useMemo(() => {
    const query = (searchQuery || '').toLowerCase().trim();
    
    if (!query) return users;
    
    return users.filter((user) => {
      return (
        user.name.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query) ||
        user.role.toLowerCase().includes(query) ||
        user.id.toString().includes(query)
      );
    });
  }, [users, searchQuery]);

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'Admin':
        return 'bg-purple-100 text-purple-800';
      case 'Editor':
        return 'bg-blue-100 text-blue-800';
      case 'Viewer':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    return status === 'Active' 
      ? 'bg-green-100 text-green-800' 
      : 'bg-red-100 text-red-800';
  };

  const handleDelete = (id: number) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      setUsers(users.filter(user => user.id !== id));
    }
  };

  const handleEdit = (user: User) => {
    setEditingUser(user);
  };

  const handleSave = (editedUser: User) => {
    setUsers(users.map(user =>
      user.id === editedUser.id ? editedUser : user
    ));
    setEditingUser(null);
  };

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-16">ID</TableHead>
            <TableHead className="w-48">Name</TableHead>
            <TableHead className="w-64">Email</TableHead>
            <TableHead className="w-32">Role</TableHead>
            <TableHead className="w-32">Status</TableHead>
            <TableHead className="w-24">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredUsers.map((user) => (
            <TableRow key={user.id}>
              <TableCell className="font-medium">{user.id}</TableCell>
              <TableCell>{user.name}</TableCell>
              <TableCell className="text-blue-600 hover:underline">
                <a href={`mailto:${user.email}`}>{user.email}</a>
              </TableCell>
              <TableCell>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getRoleColor(user.role)}`}>
                  {user.role}
                </span>
              </TableCell>
              <TableCell>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(user.status)}`}>
                  {user.status}
                </span>
              </TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEdit(user)}
                    className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                    aria-label="Edit user"
                  >
                    <Pencil className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="p-1 hover:bg-red-100 rounded-full transition-colors text-red-600"
                    aria-label="Delete user"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    {editingUser && (
      <EditUserModal
        title="Edit User"
        user={editingUser}
        onClose={() => setEditingUser(null)}
        onSave={handleSave}
      />
    )}
   </>   
  );
};

export default UsersTable;
