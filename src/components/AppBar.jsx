import { View, StyleSheet, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import theme from '../theme';
import AppBarTab from './AppBarTab';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.darkBackground,
  },
  scrollContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
});

const AppBar = () => {
  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <AppBarTab tabName="Repositories" to="/" />
        <AppBarTab tabName="Sign in" to="/signin" />
      </ScrollView>
    </View>
  );
};

export default AppBar;
