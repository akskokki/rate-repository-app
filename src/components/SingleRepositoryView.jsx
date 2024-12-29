import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-native';
import { GET_REPOSITORY } from '../graphql/queries';
import Text from './Text';
import RepositoryItem from './RepositoryItem';

const SingleRepositoryView = () => {
  const { id } = useParams();
  const { data, loading, error } = useQuery(GET_REPOSITORY, {
    variables: { repositoryId: id },
  });

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error fetching repository</Text>;

  const item = data.repository;

  console.log(item);

  return <RepositoryItem item={item} singleView />;
};

export default SingleRepositoryView;
