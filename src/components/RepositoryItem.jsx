import { Image, StyleSheet, View } from 'react-native';
import Text from './Text';
import theme from '../theme';

const RepositoryItem = ({ item }) => {
  const gapSize = 12;

  const styles = StyleSheet.create({
    container: {
      backgroundColor: 'white',
      padding: gapSize,
      gap: gapSize,
    },
    statsContainer: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-around',
    },
    statItem: {
      display: 'flex',
      alignItems: 'center',
    },
    infoContainer: {
      display: 'flex',
      flexDirection: 'row',
      gap: gapSize,
    },
    detailsContainer: {
      display: 'flex',
      alignItems: 'flex-start',
      gap: 4,
      flex: 1,
    },
    descriptionText: {
      maxWidth: '99%',
    },
    languageContainer: {
      backgroundColor: theme.colors.primary,
      borderRadius: 5,
      padding: 4,
    },
    profilePicture: {
      width: 40,
      height: 40,
      borderRadius: 5,
    },
  });

  const statItem = (value, name) => {
    const valueString =
      value >= 1000 ? (value / 1000).toFixed(1) + 'k' : value.toString();
    return (
      <View style={styles.statItem}>
        <Text fontWeight="bold">{valueString}</Text>
        <Text color="textSecondary">{name}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <Image
          style={styles.profilePicture}
          source={{ uri: item.ownerAvatarUrl }}
        />
        <View style={styles.detailsContainer}>
          <View>
            <Text fontWeight="bold">{item.fullName}</Text>
          </View>
          <View>
            <Text color="textSecondary" style={styles.descriptionText}>
              {item.description}
            </Text>
          </View>
          <View style={styles.languageContainer}>
            <Text color="white">{item.language}</Text>
          </View>
        </View>
      </View>
      <View style={styles.statsContainer}>
        {statItem(item.stargazersCount, 'Stars')}
        {statItem(item.forksCount, 'Forks')}
        {statItem(item.reviewCount, 'Reviews')}
        {statItem(item.ratingAverage, 'Rating')}
      </View>
    </View>
  );
};

export default RepositoryItem;
