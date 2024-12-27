import { useFormik } from 'formik';
import Text from './Text';
import { Pressable, StyleSheet, TextInput, View } from 'react-native';
import theme from '../theme';
import * as yup from 'yup';

const initialValues = {
  username: '',
  password: '',
};

const styles = StyleSheet.create({
  formContainer: {
    backgroundColor: theme.colors.white,
    display: 'flex',
    padding: theme.spacing.largeGap,
    gap: theme.spacing.largeGap,
  },
  input: {
    borderWidth: 1,
    borderRadius: 5,
    height: 50,
    paddingLeft: 10,
  },
  inputError: {
    borderColor: 'red',
  },
  buttonContainer: {
    backgroundColor: theme.colors.primary,
    borderRadius: 5,
    height: 50,
    justifyContent: 'center',
  },
});

const validationSchema = yup.object().shape({
  username: yup.string().required('Username is required'),
  password: yup.string().required('Password is required'),
});

const SignInForm = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  const usernameInputStyle = [
    styles.input,
    formik.touched.username && formik.errors.username
      ? styles.inputError
      : null,
  ];
  const passwordInputStyle = [
    styles.input,
    formik.touched.password && formik.errors.password
      ? styles.inputError
      : null,
  ];

  return (
    <View style={styles.formContainer}>
      <View>
        <TextInput
          style={usernameInputStyle}
          placeholder="Username"
          value={formik.values.username}
          onChangeText={formik.handleChange('username')}
        />
        {formik.touched.username && formik.errors.username && (
          <Text style={{ color: 'red' }}>{formik.errors.username}</Text>
        )}
      </View>
      <View>
        <TextInput
          style={passwordInputStyle}
          placeholder="Password"
          value={formik.values.password}
          onChangeText={formik.handleChange('password')}
          secureTextEntry
        />
        {formik.touched.password && formik.errors.password && (
          <Text style={{ color: 'red' }}>{formik.errors.password}</Text>
        )}
      </View>
      <Pressable onPress={formik.handleSubmit} style={styles.buttonContainer}>
        <Text color="white" align="center" fontWeight="bold">
          Sign in
        </Text>
      </Pressable>
    </View>
  );
};

const SignIn = () => {
  const onSubmit = (values) => {
    console.log(values);
  };

  return <SignInForm onSubmit={onSubmit} />;
};

export default SignIn;