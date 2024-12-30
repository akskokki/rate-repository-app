import { Pressable } from 'react-native';
import theme from '../theme';
import Text from './Text';

const Button = ({ text, onPress, style, ...props }) => {
  const styles = [
    {
      backgroundColor: theme.colors.primary,
      borderRadius: 5,
      height: 50,
      justifyContent: 'center',
    },
    style,
  ];

  return (
    <Pressable onPress={onPress} style={styles} {...props}>
      <Text color="white" align="center" fontWeight="bold">
        {text}
      </Text>
    </Pressable>
  );
};

export default Button;
