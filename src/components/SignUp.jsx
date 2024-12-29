import { useFormik } from 'formik';
import * as yup from 'yup';

import { StyleSheet, View } from 'react-native';
import theme from '../theme';
import VerifiedInput from './VerifiedInput';
import Button from './Button';
import { useMutation } from '@apollo/client';
import { CREATE_USER } from '../graphql/mutations';
import Text from './Text';
import { useNavigate } from 'react-router-native';
import useSignIn from '../hooks/useSignIn';

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.white,
    display: 'flex',
    padding: theme.spacing.largeGap,
    gap: theme.spacing.largeGap,
  },
});

const SignUpForm = ({ onSubmit }) => {
  const initialValues = {
    username: '',
    password: '',
    passwordConfirm: '',
  };

  const validationSchema = yup.object().shape({
    username: yup.string().min(5).max(30).required(),
    password: yup.string().required(),
    passwordConfirm: yup
      .string()
      .oneOf([yup.ref('password'), null], 'Passwords must match')
      .required(),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <View style={styles.container}>
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
      <VerifiedInput
        placeholder="Confirm password"
        formikFieldName="passwordConfirm"
        formik={formik}
        secureTextEntry
      />
      <Button text="Sign up" onPress={formik.handleSubmit} />
    </View>
  );
};

const SignUp = () => {
  const [signUp, { loading, error }] = useMutation(CREATE_USER);
  const [signIn] = useSignIn();
  const navigate = useNavigate();

  if (loading) return <Text>Submitting...</Text>;
  if (error)
    return <Text>Submission error: {JSON.stringify(error, null, 2)}</Text>;

  const onSubmit = async (values) => {
    const user = { username: values.username, password: values.password };
    await signUp({ variables: { user } });
    await signIn(user);
    navigate('/');
  };

  return <SignUpForm onSubmit={onSubmit} />;
};

export default SignUp;
