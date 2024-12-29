import { Pressable } from 'react-native';
import theme from '../theme';
import Text from './Text';

const Button = ({ text, onPress, ...props }) => {
  const style = {
    backgroundColor: theme.colors.primary,
    borderRadius: 5,
    height: 50,
    justifyContent: 'center',
  };

  return (
    <Pressable onPress={onPress} style={style} {...props}>
      <Text color="white" align="center" fontWeight="bold">
        {text}
      </Text>
    </Pressable>
  );
};

export default Button;
