import { View, StyleSheet, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import theme from '../theme';
import AppBarTab from './AppBarTab';
import { CURRENT_USER } from '../graphql/queries';
import { useQuery } from '@apollo/client';

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
  const { data } = useQuery(CURRENT_USER);

  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <AppBarTab tabName="Repositories" to="/" />
        {data?.me ? (
          <AppBarTab tabName="Sign out" to="/signout" />
        ) : (
          <AppBarTab tabName="Sign in" to="/signin" />
        )}
      </ScrollView>
    </View>
  );
};

export default AppBar;
