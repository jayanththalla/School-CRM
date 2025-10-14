import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in (from localStorage)
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = (email, password) => {
    // Demo accounts
    const demoAccounts = [
      {
        email: 'demo@school.com',
        password: 'demo123',
        user: {
          id: '1',
          name: 'Demo Parent',
          email: 'demo@school.com',
          role: 'parent',
          students: [
            {
              id: 'student1',
              name: 'John Doe',
              class: '10th Grade',
              section: 'A'
            }
          ]
        }
      },
      {
        email: 'parent@school.com',
        password: 'parent123',
        user: {
          id: '2',
          name: 'Sarah Johnson',
          email: 'parent@school.com',
          role: 'parent',
          students: [
            {
              id: 'student2',
              name: 'Emma Johnson',
              class: '9th Grade',
              section: 'B'
            }
          ]
        }
      }
    ];

    const account = demoAccounts.find(
      acc => acc.email === email && acc.password === password
    );

    if (account) {
      setUser(account.user);
      localStorage.setItem('user', JSON.stringify(account.user));
      localStorage.setItem('token', 'demo-token-' + account.user.id);
      return { success: true, user: account.user };
    }

    return { success: false, message: 'Invalid credentials' };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  const value = {
    user,
    loading,
    login,
    logout,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
