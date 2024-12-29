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

  const validationSchema = yup.object().shape({
    ownerName: yup.string().required(),
    repositoryName: yup.string().required(),
    rating: yup.number().min(0).max(100).required(),
    text: yup.string(),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  // console.log(JSON.stringify(formik, null, 2));

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
  // if (data) navigate(`/repositories/${data.createReview.repositoryId}`);

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
