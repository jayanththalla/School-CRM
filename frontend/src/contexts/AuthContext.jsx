import React, { createContext, useContext, useEffect, useState } from 'react';
import { useUser, useAuth as useClerkAuth, useClerk, useSession } from '@clerk/clerk-react';

const AuthContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const { user: clerkUser, isLoaded: clerkLoaded } = useUser();
  const { signOut } = useClerkAuth();
  const { session } = useSession();
  const clerk = useClerk();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Transform Clerk user to our app's user format
  const transformUser = (clerkUser) => {
    if (!clerkUser) return null;

    return {
      id: clerkUser.id,
      name: clerkUser.fullName || clerkUser.firstName || 'User',
      email: clerkUser.emailAddresses[0]?.emailAddress || '',
      role: 'parent', // Default role, can be customized based on user metadata
      students: [
        {
          id: 'student1',
          name: 'John Doe',
          class: '10th Grade',
          section: 'A'
        }
      ],
      profileImageUrl: clerkUser.profileImageUrl,
      clerkUser // Keep reference to original Clerk user
    };
  };

  // Check for demo user in localStorage on initial load
  useEffect(() => {
    // First check if we have a demo user in localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        setLoading(false);
        return;
      } catch (e) {
        console.error('Error parsing stored user:', e);
        localStorage.removeItem('user');
      }
    }

    // If no demo user, check Clerk authentication
    if (clerkLoaded) {
      const transformedUser = transformUser(clerkUser);
      setUser(transformedUser);
      setLoading(false);
    }
  }, [clerkUser, clerkLoaded]);

  const login = async (email, password) => {
    // Demo accounts for testing
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
      // Store user data in localStorage for demo purposes
      localStorage.setItem('user', JSON.stringify(account.user));
      localStorage.setItem('token', 'demo-token-' + account.user.id);
      setUser(account.user);
      return { success: true, user: account.user };
    }

    return { success: false, message: 'Invalid credentials' };
  };

  const logout = async () => {
    // Clear demo user data if exists
    localStorage.removeItem('user');
    localStorage.removeItem('token');

    // If we have a Clerk user, sign out from Clerk
    if (clerkUser) {
      await signOut();
    }

    setUser(null);
  };

  // Check if user is authenticated (either demo or Clerk)
  const isAuthenticated = !!user || !!clerkUser;

  const value = {
    user: user || transformUser(clerkUser),
    loading,
    login,
    logout,
    isAuthenticated,
    clerkUser, // Expose Clerk user for advanced usage
    clerk, // Expose Clerk instance for advanced usage
    session // Expose session for advanced usage
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};