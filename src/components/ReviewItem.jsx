import { Alert, StyleSheet, View } from 'react-native';
import theme from '../theme';
import Text from './Text';
import { format } from 'date-fns';
import Button from './Button';

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.white,
    display: 'flex',
    padding: theme.spacing.largeGap,
    gap: theme.spacing.largeGap,
  },
  reviewContainer: {
    display: 'flex',
    flexDirection: 'row',
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
  buttonsContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: theme.spacing.largeGap,
  },
  button: {
    flex: 1,
  },
  deleteButton: {
    backgroundColor: theme.colors.error,
  },
});

const ReviewItem = ({ review, myReviews = false, navigate, deleteReview }) => {
  const handleDelete = () =>
    Alert.alert(
      'Delete review',
      'Are you sure you want to delete this review?',
      [
        { text: 'Cancel' },
        { text: 'Delete', onPress: () => deleteReview(review.id) },
      ],
      { cancelable: true }
    );

  return (
    <View style={styles.container}>
      <View style={styles.reviewContainer}>
        <View style={styles.reviewScoreContainer}>
          <Text color="primary" fontWeight="bold" align="center">
            {review.rating}
          </Text>
        </View>
        <View style={styles.reviewDetailsContainer}>
          <Text fontWeight="bold">
            {myReviews ? review.repository.fullName : review.user.username}
          </Text>
          <Text color="textSecondary">
            {format(new Date(review.createdAt), 'yyyy-MM-dd, HH:mm')}
          </Text>
          <Text style={styles.reviewText}>{review.text}</Text>
        </View>
      </View>
      {myReviews && (
        <View style={styles.buttonsContainer}>
          <Button
            style={styles.button}
            text="View repository"
            onPress={() => navigate(`/repositories/${review.repository.id}`)}
          />
          <Button
            style={[styles.button, styles.deleteButton]}
            text="Delete review"
            onPress={handleDelete}
          />
        </View>
      )}
    </View>
  );
};

export default ReviewItem;
