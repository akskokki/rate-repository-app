import { StyleSheet, View } from 'react-native';
import theme from '../theme';
import Text from './Text';
import { format } from 'date-fns';

const styles = StyleSheet.create({
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

const ReviewItem = ({ review, myReviews = false }) => {
  return (
    <>
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
    </>
  );
};

export default ReviewItem;
