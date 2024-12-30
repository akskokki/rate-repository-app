import { useQuery } from '@apollo/client';
import { CURRENT_USER } from '../graphql/queries';
import { FlatList } from 'react-native';
import ItemSeparator from './ItemSeparator';
import ReviewItem from './ReviewItem';

const MyReviewsList = () => {
  const { data } = useQuery(CURRENT_USER, {
    variables: { includeReviews: true },
    fetchPolicy: 'cache-and-network',
  });

  const reviews = data ? data.me.reviews.edges.map((e) => e.node) : [];

  return (
    <FlatList
      data={reviews}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => <ReviewItem review={item} myReviews />}
      keyExtractor={({ id }) => id}
    />
  );
};

export default MyReviewsList;
