import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-native';
import { format } from 'date-fns';

import { GET_REPOSITORY } from '../graphql/queries';
import Text from './Text';
import RepositoryItem from './RepositoryItem';
import { FlatList, StyleSheet, View } from 'react-native';
import theme from '../theme';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  reviewContainer: {
    backgroundColor: theme.colors.white,
    display: 'flex',
    flexDirection: 'row',
    padding: theme.spacing.largeGap,
    gap: theme.spacing.largeGap,
  },
  reviewScoreContainer: {
    borderWidth: 2,
    borderColor: theme.colors.primary,
    height: 40,
    width: 40,
    borderRadius: 20,
    display: 'flex',
    justifyContent: 'center',
  },
  reviewDetailsContainer: {
    display: 'flex',
    flex: 1,
  },
  reviewText: {
    paddingTop: 3,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryInfo = ({ repository }) => {
  return <RepositoryItem item={repository} singleView />;
};

const ReviewItem = ({ review }) => {
  return (
    <>
      <ItemSeparator />
      <View style={styles.reviewContainer}>
        <View style={styles.reviewScoreContainer}>
          <Text color="primary" fontWeight="bold" align="center">
            {review.rating}
          </Text>
        </View>
        <View style={styles.reviewDetailsContainer}>
          <Text fontWeight="bold">{review.user.username}</Text>
          <Text color="textSecondary">
            {format(new Date(review.createdAt), 'yyyy-MM-dd, hh:mm')}
          </Text>
          <Text style={styles.reviewText}>{review.text}</Text>
        </View>
      </View>
    </>
  );
};

const SingleRepositoryView = () => {
  const { id } = useParams();
  const { data, loading, error } = useQuery(GET_REPOSITORY, {
    variables: { repositoryId: id },
    fetchPolicy: 'cache-and-network',
  });

  if (!data && loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error fetching repository</Text>;

  const repository = data.repository;
  const reviews = repository.reviews.edges.map((e) => e.node);

  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ id }) => id}
      ListHeaderComponent={() => <RepositoryInfo repository={repository} />}
    />
  );
};

export default SingleRepositoryView;
