import React, { useState } from 'react';
import { X } from 'lucide-react';
import { User } from '@/types/users.type';

interface EditUserModalProps {
  title: string;
  user: User;
  onClose: () => void;
  onSave: (editedUser: User) => void;
}

const EditUserModal: React.FC<EditUserModalProps> = ({ 
  title, 
  user, 
  onClose, 
  onSave 
}) => {
  const [editedUser, setEditedUser] = useState<User>({ ...user });
  const availableRoles = ['Admin', 'Editor', 'Viewer'];
  // const availableStatuses = ['Active', 'Inactive'];

  const handleInputChange = (field: keyof User, value: string) => {
    setEditedUser(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isFormValid = () => {
    return (
      editedUser.name.trim() !== '' &&
      validateEmail(editedUser.email) &&
      editedUser.role !== '' &&
      editedUser.status !== ''
    );
  };

  const getRoleButtonClass = (role: string) => {
    const baseClass = "px-3 py-1 rounded-full text-sm font-medium transition-colors";
    if (editedUser.role === role) {
      switch (role) {
        case 'Admin':
          return `${baseClass} bg-purple-100 text-purple-800`;
        case 'Editor':
          return `${baseClass} bg-blue-100 text-blue-800`;
        case 'Viewer':
          return `${baseClass} bg-gray-100 text-gray-800`;
        default:
          return `${baseClass} bg-gray-100 text-gray-800`;
      }
    }
    return `${baseClass} bg-gray-50 text-gray-600 hover:bg-gray-100`;
  };

  // const getStatusButtonClass = (status: string) => {
  //   const baseClass = "px-3 py-1 rounded-full text-sm font-medium transition-colors";
  //   if (editedUser.status === status) {
  //     return status === 'Active'
  //       ? `${baseClass} bg-green-100 text-green-800`
  //       : `${baseClass} bg-red-100 text-red-800`;
  //   }
  //   return `${baseClass} bg-gray-50 text-gray-600 hover:bg-gray-100`;
  // };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md relative">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
          <button 
            onClick={onClose} 
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Close modal"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>
        
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              type="text"
              value={editedUser.name}
              onChange={e => handleInputChange('name', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter user name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              value={editedUser.email}
              onChange={e => handleInputChange('email', e.target.value)}
              className={`w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                editedUser.email && !validateEmail(editedUser.email)
                  ? 'border-red-500 focus:border-red-500'
                  : 'border-gray-300 focus:border-blue-500'
              }`}
              placeholder="Enter email address"
            />
            {editedUser.email && !validateEmail(editedUser.email) && (
              <p className="text-red-500 text-sm mt-1">
                Please enter a valid email address
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Role
            </label>
            <div className="flex flex-wrap gap-2">
              {availableRoles.map(role => (
                <button
                  key={role}
                  onClick={() => handleInputChange('role', role)}
                  className={getRoleButtonClass(role)}
                >
                  {role}
                  {editedUser.role === role && (
                    <span className="ml-1">✓</span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Status
            </label>
            <div className="flex flex-wrap gap-2">
              {availableStatuses.map(status => (
                <button
                  key={status}
                  onClick={() => handleInputChange('status', status)}
                  className={getStatusButtonClass(status)}
                >
                  {status}
                  {editedUser.status === status && (
                    <span className="ml-1">✓</span>
                  )}
                </button>
              ))}
            </div>
          </div> */}
        </div>

        <div className="flex justify-end space-x-3 mt-8">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => onSave(editedUser)}
            disabled={!isFormValid()}
            className={`px-4 py-2 text-sm text-white rounded-lg transition-colors ${
              isFormValid()
                ? 'bg-blue-600 hover:bg-blue-700'
                : 'bg-blue-300 cursor-not-allowed'
            }`}
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditUserModal;