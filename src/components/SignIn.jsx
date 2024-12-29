import { useFormik } from 'formik';
import Text from './Text';
import { Pressable, StyleSheet, View } from 'react-native';
import theme from '../theme';
import * as yup from 'yup';
import useSignIn from '../hooks/useSignIn';
import { useNavigate } from 'react-router-native';
import VerifiedInput from './VerifiedInput';

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
      <Pressable onPress={formik.handleSubmit} style={styles.buttonContainer}>
        <Text color="white" align="center" fontWeight="bold">
          Sign in
        </Text>
      </Pressable>
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
