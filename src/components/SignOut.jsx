import { useApolloClient } from '@apollo/client';
import useAuthStorage from '../hooks/useAuthStorage';
import { Navigate } from 'react-router-native';

const SignOut = () => {
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();

  authStorage.removeAccessToken();
  apolloClient.resetStore();

  return <Navigate to="/" replace />;
};

export default SignOut;
