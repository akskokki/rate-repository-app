import { Pressable, StyleSheet } from 'react-native';
import Text from './Text';

const styles = StyleSheet.create({
  tab: {
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 10,
    paddingRight: 10,
  },
});

const AppBarTab = ({ tabName }) => {
  return (
    <Pressable style={styles.tab} onPress={() => console.log('e')}>
      <Text color="white" fontWeight="bold" fontSize="subheading">
        {tabName}
      </Text>
    </Pressable>
  );
};

export default AppBarTab;
