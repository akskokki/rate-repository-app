import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-native';

import { GET_REPOSITORY } from '../graphql/queries';
import Text from './Text';
import RepositoryItem from './RepositoryItem';
import { FlatList } from 'react-native';
import ReviewItem from './ReviewItem';
import ItemSeparator from './ItemSeparator';

const RepositoryInfo = ({ repository }) => {
  return (
    <>
      <RepositoryItem item={repository} singleView />
      <ItemSeparator />
    </>
  );
};

const SingleRepositoryView = () => {
  const { id } = useParams();
  const { data, loading, error, fetchMore } = useQuery(GET_REPOSITORY, {
    variables: { repositoryId: id, first: 5 },
    fetchPolicy: 'cache-and-network',
  });

  if (!data && loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error fetching repository</Text>;

  const repository = data.repository;
  const reviews = repository.reviews.edges.map((e) => e.node);

  const handleFetchMore = () => {
    const canFetchMore =
      !loading && data?.repository.reviews.pageInfo.hasNextPage;

    if (!canFetchMore) return;

    fetchMore({
      variables: {
        after: data.repository.reviews.pageInfo.endCursor,
        repositoryId: id,
        first: 5,
      },
    });
  };

  const onEndReach = () => {
    handleFetchMore();
  };

  return (
    <FlatList
      data={reviews}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ id }) => id}
      ListHeaderComponent={() => <RepositoryInfo repository={repository} />}
      onEndReached={onEndReach}
      onEndReachedThreshold={0.2}
    />
  );
};

export default SingleRepositoryView;
