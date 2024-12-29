import { StyleSheet, TextInput, View } from 'react-native';
import Text from './Text';
import theme from '../theme';

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderRadius: 5,
    height: 50,
    paddingLeft: 10,
  },
  inputError: {
    borderColor: theme.colors.error,
  },
});

const VerifiedInput = ({
  placeholder,
  formikFieldName,
  formik,
  style,
  ...props
}) => {
  const formikValue = formik.values[formikFieldName];
  const formikError = formik.errors[formikFieldName];
  const formikTouched = formik.touched[formikFieldName];
  const handleChange = formik.handleChange(formikFieldName);

  const inputStyle = [
    styles.input,
    formikTouched && formikError ? styles.inputError : null,
  ];

  return (
    <View style={style}>
      <TextInput
        style={inputStyle}
        placeholder={placeholder}
        value={formikValue}
        onChangeText={handleChange}
        {...props}
      />
      {formikTouched && formikError && <Text color="error">{formikError}</Text>}
    </View>
  );
};

export default VerifiedInput;
