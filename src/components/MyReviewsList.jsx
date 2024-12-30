import { useMutation, useQuery } from '@apollo/client';
import { CURRENT_USER } from '../graphql/queries';
import { FlatList } from 'react-native';
import ItemSeparator from './ItemSeparator';
import ReviewItem from './ReviewItem';
import { useNavigate } from 'react-router-native';
import { DELETE_REVIEW } from '../graphql/mutations';

const MyReviewsList = () => {
  const { data, refetch } = useQuery(CURRENT_USER, {
    variables: { includeReviews: true },
    fetchPolicy: 'cache-and-network',
  });

  const [deleteReview] = useMutation(DELETE_REVIEW);

  const navigate = useNavigate();

  const reviews = data ? data.me.reviews.edges.map((e) => e.node) : [];

  const handleDelete = async (id) => {
    await deleteReview({ variables: { deleteReviewId: id } });
    refetch();
  };

  return (
    <FlatList
      data={reviews}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => (
        <ReviewItem
          review={item}
          myReviews
          navigate={navigate}
          deleteReview={handleDelete}
        />
      )}
      keyExtractor={({ id }) => id}
    />
  );
};

export default MyReviewsList;
