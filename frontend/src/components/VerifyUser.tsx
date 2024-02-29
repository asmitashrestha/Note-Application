import React, { useEffect } from 'react';
import { useAuthStore } from '../../store/store';
import * as apiClient from '../api-client';

interface VerifyUserProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<VerifyUserProps> = ({ children }) => {
  const { setUser } = useAuthStore();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await apiClient.validateToken();
        setUser(userData);
      } catch (error) {
        // Handle error
        console.error('Error validating token:', error);
      }
    };

    fetchData();
  }, [setUser]);

  return <>{children}</>;
};
