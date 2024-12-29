import { useFormik } from 'formik';
import { StyleSheet, View } from 'react-native';
import * as yup from 'yup';
import VerifiedInput from './VerifiedInput';
import theme from '../theme';
import Button from './Button';
import { useMutation } from '@apollo/client';
import { CREATE_REVIEW } from '../graphql/mutations';
import { useNavigate } from 'react-router-native';
import Text from './Text';

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.white,
    display: 'flex',
    padding: theme.spacing.largeGap,
    gap: theme.spacing.largeGap,
  },
});

const CreateReviewForm = ({ onSubmit }) => {
  const initialValues = {
    ownerName: '',
    repositoryName: '',
    rating: '',
    text: '',
  };

  const ratingError = 'Rating must be an integer between 0 and 100';

  const validationSchema = yup.object().shape({
    ownerName: yup.string().required('Repository owner name is required'),
    repositoryName: yup.string().required('Repository name is required'),
    rating: yup
      .number()
      .typeError(ratingError)
      .integer(ratingError)
      .min(0, ratingError)
      .max(100, ratingError)
      .required('Rating is required'),
    text: yup.string(),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <View style={styles.container}>
      <VerifiedInput
        placeholder="Repository owner name"
        formikFieldName="ownerName"
        formik={formik}
      />
      <VerifiedInput
        placeholder="Repository name"
        formikFieldName="repositoryName"
        formik={formik}
      />
      <VerifiedInput
        placeholder="Rating between 0 and 100"
        formikFieldName="rating"
        formik={formik}
      />
      <VerifiedInput
        placeholder="Review"
        formikFieldName="text"
        formik={formik}
      />
      <Button text="Create a review" onPress={formik.handleSubmit} />
    </View>
  );
};

const CreateReview = () => {
  const [createReview, { loading, error }] = useMutation(CREATE_REVIEW);
  const navigate = useNavigate();

  if (loading) return <Text>Submitting...</Text>;
  if (error) return <Text>Submission error</Text>;

  const onSubmit = async (values) => {
    console.log(values);
    const response = await createReview({
      variables: { review: { ...values, rating: Number(values.rating) } },
    });
    navigate(`/repositories/${response.data.createReview.repositoryId}`);
  };

  return <CreateReviewForm onSubmit={onSubmit} />;
};

export default CreateReview;
