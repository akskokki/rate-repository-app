import { useFormik } from 'formik';
import { StyleSheet, View } from 'react-native';
import { useNavigate } from 'react-router-native';
import * as yup from 'yup';

import theme from '../theme';
import useSignIn from '../hooks/useSignIn';
import VerifiedInput from './VerifiedInput';
import Button from './Button';

const styles = StyleSheet.create({
  formContainer: {
    backgroundColor: theme.colors.white,
    display: 'flex',
    padding: theme.spacing.largeGap,
    gap: theme.spacing.largeGap,
  },
  buttonContainer: {
    backgroundColor: theme.colors.primary,
    borderRadius: 5,
    height: 50,
    justifyContent: 'center',
  },
});

const initialValues = {
  username: '',
  password: '',
};

const validationSchema = yup.object().shape({
  username: yup.string().required('Username is required'),
  password: yup.string().required('Password is required'),
});

export const SignInForm = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <View style={styles.formContainer}>
      <VerifiedInput
        placeholder="Username"
        formikFieldName="username"
        formik={formik}
      />
      <VerifiedInput
        placeholder="Password"
        formikFieldName="password"
        formik={formik}
        secureTextEntry
      />
      <Button text="Sign in" onPress={formik.handleSubmit} />
    </View>
  );
};

const SignIn = () => {
  const [signIn] = useSignIn();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      const { data } = await signIn({ username, password });
      console.log(data);
      navigate('/');
    } catch (e) {
      console.log(e);
    }
  };

  return <SignInForm onSubmit={onSubmit} />;
};

export default SignIn;
