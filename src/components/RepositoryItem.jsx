import { Image, StyleSheet, View } from 'react-native';
import Text from './Text';

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
  });

  const statItem = (value, name) => {
    const valueString =
      value >= 1000 ? (value / 1000).toFixed(1) + 'k' : value.toString();

    return (
      <View style={styles.statItem}>
        <Text fontWeight="bold">{valueString}</Text>
        <Text>{name}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <Image
          style={{ width: 40, height: 40, borderRadius: 5 }}
          source={{ uri: item.ownerAvatarUrl }}
        />
        <View>
          <View>
            <Text>{item.fullName}</Text>
          </View>
          <View>
            <Text>{item.description}</Text>
          </View>
          <View>
            <Text>{item.language}</Text>
          </View>
        </View>
      </View>
      <View style={styles.statsContainer}>
        {statItem(item.stargazersCount, 'Stars')}
        {statItem(item.forksCount, 'Forks')}
        {statItem(item.reviewCount, 'Reviews')}
        {statItem(item.ratingAverage, 'Rating')}
      </View>
      {/* <Text color="textSecondary">
        Full name: {item.fullName} {'\n'}
        Description: {item.description} {'\n'}
        Language: {item.language} {'\n'}
        Stars: {item.stargazersCount} {'\n'}
        Forks: {item.forksCount} {'\n'}
        Reviews: {item.reviewCount} {'\n'}
        Rating: {item.ratingAverage}
      </Text> */}
    </View>
  );
};

export default RepositoryItem;
