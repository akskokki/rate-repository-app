import { View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import theme from '../theme';
import AppBarTab from './AppBarTab';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.darkBackground,
    display: 'flex',
    flexDirection: 'row',
  },
});

const AppBar = () => {
  return (
    <View style={styles.container}>
      <AppBarTab tabName="Repositories" />
      <AppBarTab tabName="Repositories" />
      <AppBarTab tabName="Repositories" />
    </View>
  );
};

export default AppBar;
