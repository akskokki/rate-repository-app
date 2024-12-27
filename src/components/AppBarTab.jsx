import { Pressable, StyleSheet } from 'react-native';
import Text from './Text';
import { useNavigate } from 'react-router-native';

const styles = StyleSheet.create({
  tab: {
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 10,
    paddingRight: 10,
  },
});

const AppBarTab = ({ tabName, to }) => {
  const navigate = useNavigate();
  const handlePress = () => navigate(to);

  return (
    <Pressable style={styles.tab} onPress={handlePress}>
      <Text color="white" fontWeight="bold" fontSize="subheading">
        {tabName}
      </Text>
    </Pressable>
  );
};

export default AppBarTab;
