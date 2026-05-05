import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext(null);

// Default admin user with full permissions
const DEFAULT_USERS = [
  {
    username: '4dM1n',
    password: '4dM1n@12&34',
    role: 'superadmin',
    displayName: 'Super Admin',
    permissions: {
      canManageBlogs: true,
      canEditBlogs: true,
      canDeleteBlogs: true,
      canManageProducts: true,
      canEditProducts: true,
      canDeleteProducts: true,
      canManageUsers: true,
      canAccessSettings: true
    }
  },
  {
    username: 'editor',
    password: '3d1t0r!23',
    role: 'editor',
    displayName: 'Content Editor',
    permissions: {
      canManageBlogs: true,
      canEditBlogs: true,
      canDeleteBlogs: false,
      canManageProducts: false,
      canEditProducts: true,
      canDeleteProducts: false,
      canManageUsers: false,
      canAccessSettings: false
    }
  },
  {
    username: 'productmgr',
    password: 'Pr0dMGr@456',
    role: 'productmanager',
    displayName: 'Product Manager',
    permissions: {
      canManageBlogs: false,
      canEditBlogs: true,
      canDeleteBlogs: false,
      canManageProducts: true,
      canEditProducts: true,
      canDeleteProducts: true,
      canManageUsers: false,
      canAccessSettings: false
    }
  }
];

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('admin_user')));
  const [users, setUsers] = useState(() => {
    const savedUsers = localStorage.getItem('cms_users');
    return savedUsers ? JSON.parse(savedUsers) : DEFAULT_USERS;
  });

  // Save users to localStorage whenever they change
  React.useEffect(() => {
    localStorage.setItem('cms_users', JSON.stringify(users));
  }, [users]);

  const login = (username, password) => {
    const foundUser = users.find(
      u => u.username === username && u.password === password
    );
    
    if (foundUser) {
      const { password, ...userData } = foundUser;
      localStorage.setItem('admin_user', JSON.stringify(userData));
      setUser(userData);
      return { success: true, user: userData };
    }
    return { success: false, error: 'Username atau password salah' };
  };

  const logout = () => {
    localStorage.removeItem('admin_user');
    setUser(null);
  };

  const addUser = (newUser) => {
    if (users.find(u => u.username === newUser.username)) {
      return { success: false, error: 'Username sudah digunakan' };
    }
    const userWithPermissions = {
      ...newUser,
      permissions: {
        canManageBlogs: false,
        canEditBlogs: false,
        canDeleteBlogs: false,
        canManageProducts: false,
        canEditProducts: false,
        canDeleteProducts: false,
        canManageUsers: false,
        canAccessSettings: false,
        ...newUser.permissions
      }
    };
    const updatedUsers = [...users, userWithPermissions];
    setUsers(updatedUsers);
    return { success: true };
  };

  const updateUser = (username, updates) => {
    const updatedUsers = users.map(u => 
      u.username === username ? { ...u, ...updates } : u
    );
    setUsers(updatedUsers);
    
    // Update current user if they were modified
    if (user && user.username === username) {
      const { password, ...userData } = updatedUsers.find(u => u.username === username);
      localStorage.setItem('admin_user', JSON.stringify(userData));
      setUser(userData);
    }
    return { success: true };
  };

  const deleteUser = (username) => {
    if (username === '4dM1n') {
      return { success: false, error: 'Tidak dapat menghapus superadmin' };
    }
    setUsers(users.filter(u => u.username !== username));
    return { success: true };
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      logout, 
      isAuthenticated: !!user,
      users,
      addUser,
      updateUser,
      deleteUser
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};