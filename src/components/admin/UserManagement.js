import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit2, Trash2, X, Save, User, Shield } from 'lucide-react';
import toast from 'react-hot-toast';

const UserManagement = ({ isOpen, onClose, users, addUser, updateUser, deleteUser, currentUser }) => {
  const [showForm, setShowForm] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    displayName: '',
    role: 'editor',
    permissions: {
      canManageBlogs: false,
      canEditBlogs: false,
      canDeleteBlogs: false,
      canManageProducts: false,
      canEditProducts: false,
      canDeleteProducts: false,
      canManageUsers: false,
      canAccessSettings: false
    }
  });

  const resetForm = () => {
    setFormData({
      username: '',
      password: '',
      displayName: '',
      role: 'editor',
      permissions: {
        canManageBlogs: false,
        canEditBlogs: false,
        canDeleteBlogs: false,
        canManageProducts: false,
        canEditProducts: false,
        canDeleteProducts: false,
        canManageUsers: false,
        canAccessSettings: false
      }
    });
    setEditingUser(null);
    setShowForm(false);
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setFormData({
      username: user.username,
      password: '',
      displayName: user.displayName,
      role: user.role,
      permissions: { ...user.permissions }
    });
    setShowForm(true);
  };

  const handleSave = () => {
    if (!formData.username || !formData.displayName) {
      toast.error('Username dan nama tampil wajib diisi');
      return;
    }

    if (editingUser) {
      const updates = {
        displayName: formData.displayName,
        role: formData.role,
        permissions: formData.permissions
      };
      
      if (formData.password) {
        updates.password = formData.password;
      }
      
      updateUser(formData.username, updates);
      toast.success('User berhasil diupdate');
    } else {
      if (!formData.password) {
        toast.error('Password wajib diisi untuk user baru');
        return;
      }
      
      const result = addUser(formData);
      if (result.success) {
        toast.success('User berhasil ditambahkan');
      } else {
        toast.error(result.error);
        return;
      }
    }

    resetForm();
  };

  const handleDelete = (username) => {
    if (username === '4dM1n') {
      toast.error('Tidak dapat menghapus superadmin');
      return;
    }
    
    if (window.confirm(`Yakin ingin menghapus user "${username}"?`)) {
      const result = deleteUser(username);
      if (result.success) {
        toast.success('User berhasil dihapus');
      } else {
        toast.error(result.error);
      }
    }
  };

  const togglePermission = (permission) => {
    setFormData(prev => ({
      ...prev,
      permissions: {
        ...prev.permissions,
        [permission]: !prev.permissions[permission]
      }
    }));
  };

  if (!isOpen) return null;

  const roleLabels = {
    superadmin: 'Super Admin',
    admin: 'Admin',
    editor: 'Content Editor',
    productmanager: 'Product Manager',
    viewer: 'Viewer'
  };

  const permissionGroups = [
    {
      title: 'Blog Management',
      permissions: [
        { key: 'canManageBlogs', label: 'Manage Blogs' },
        { key: 'canEditBlogs', label: 'Edit Blogs' },
        { key: 'canDeleteBlogs', label: 'Delete Blogs' }
      ]
    },
    {
      title: 'Product Management',
      permissions: [
        { key: 'canManageProducts', label: 'Manage Products' },
        { key: 'canEditProducts', label: 'Edit Products' },
        { key: 'canDeleteProducts', label: 'Delete Products' }
      ]
    },
    {
      title: 'System',
      permissions: [
        { key: 'canManageUsers', label: 'Manage Users' },
        { key: 'canAccessSettings', label: 'Access Settings' }
      ]
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-hidden flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <Shield className="w-6 h-6 text-purple-600" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Manajemen User
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {!showForm ? (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Daftar User ({users.length})
                </h3>
                <button
                  onClick={() => setShowForm(true)}
                  className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Tambah User
                </button>
              </div>

              <div className="space-y-3">
                {users.map((user, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                  >
                    <div className="flex items-center gap-4 flex-1">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 dark:text-white">
                          {user.displayName}
                        </h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          @{user.username} • {roleLabels[user.role] || user.role}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {user.username === '4dM1n' && (
                        <span className="px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded text-xs font-medium">
                          Super Admin
                        </span>
                      )}
                      <button
                        onClick={() => handleEdit(user)}
                        className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded transition-colors"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      {user.username !== '4dM1n' && user.username !== currentUser.username && (
                        <button
                          onClick={() => handleDelete(user.username)}
                          className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {editingUser ? 'Edit User' : 'Tambah User Baru'}
                </h3>
                <button
                  onClick={resetForm}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Basic Info */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Username *
                  </label>
                  <input
                    type="text"
                    value={formData.username}
                    onChange={(e) => setFormData(prev => ({ ...prev, username: e.target.value }))}
                    disabled={!!editingUser}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50"
                    placeholder="username"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Nama Tampilan *
                  </label>
                  <input
                    type="text"
                    value={formData.displayName}
                    onChange={(e) => setFormData(prev => ({ ...prev, displayName: e.target.value }))}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Nama lengkap"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Password {editingUser ? '(kosongkan jika tidak diubah)' : '*'}
                  </label>
                  <input
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Password"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Role
                  </label>
                  <select
                    value={formData.role}
                    onChange={(e) => setFormData(prev => ({ ...prev, role: e.target.value }))}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="editor">Content Editor</option>
                    <option value="productmanager">Product Manager</option>
                    <option value="admin">Admin</option>
                    <option value="superadmin">Super Admin</option>
                    <option value="viewer">Viewer</option>
                  </select>
                </div>
              </div>

              {/* Permissions */}
              <div>
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Hak Akses
                </h4>
                <div className="space-y-6">
                  {permissionGroups.map((group, index) => (
                    <div key={index}>
                      <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                        {group.title}
                      </h5>
                      <div className="space-y-2">
                        {group.permissions.map((perm) => (
                          <label
                            key={perm.key}
                            className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                          >
                            <input
                              type="checkbox"
                              checked={formData.permissions[perm.key]}
                              onChange={() => togglePermission(perm.key)}
                              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                            />
                            <span className="text-gray-900 dark:text-white">{perm.label}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end gap-3 pt-6 border-t border-gray-200 dark:border-gray-700">
                <button
                  onClick={resetForm}
                  className="px-6 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  Batal
                </button>
                <button
                  onClick={handleSave}
                  className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all flex items-center gap-2 font-semibold"
                >
                  <Save className="w-4 h-4" />
                  Simpan User
                </button>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default UserManagement;
