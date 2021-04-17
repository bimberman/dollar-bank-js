import React, { useState } from 'react';
import cookies from 'js-cookie';
import { Center, Spinner } from '@chakra-ui/react';
import { usePostCustomerAuthById } from '../hooks/useCustomer';

const AuthContext = React.createContext();
AuthContext.displayName = 'AuthContext';

function useAuth() {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within a AuthProvider');
  }
  return context;
}

export default function AuthProvider(props) {
  const auth = useProvidedAuth();

  const value = React.useMemo(() => auth, [auth]);
  value.isLoading = false;
  if (value.isLoading) {
    return (
      <Center h="100vh">
        <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="blue.500" size="xl" />
      </Center>
    );
  }

  return <AuthContext.Provider value={value} {...props} />;
}

const formatUser = async user => {
  return {
    id: user.uid
  };
};

function useProvidedAuth() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const handleUser = async rawUser => {
    if (rawUser) {
      // eslint-disable-next-line no-shadow
      const user = await formatUser(rawUser);

      setUser(user);

      cookies.set('dollar-bank', true, {
        expires: 1
      });

      setIsLoading(false);
      return user;
    }

    setUser(false);
    cookies.remove('dollar-bank');

    setIsLoading(false);
    return false;
  };

  const signIn = (customerId, password) => {
    setIsLoading(true);
    const something = usePostCustomerAuthById(customerId, password);
  };

  const signOut = () => {
    handleUser(false);
  };

  return {
    user,
    isLoading,
    handleUser,
    signIn,
    signOut
  };
}

export { useAuth };
