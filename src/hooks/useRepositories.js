import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = (order, filter, first) => {
  let orderVars;
  switch (order) {
    case 'latest':
      orderVars = { orderBy: 'CREATED_AT', orderDirection: 'DESC' };
      break;
    case 'highestRated':
      orderVars = { orderBy: 'RATING_AVERAGE', orderDirection: 'DESC' };
      break;
    case 'lowestRated':
      orderVars = { orderBy: 'RATING_AVERAGE', orderDirection: 'ASC' };
      break;
  }

  const variables = { ...orderVars, searchKeyword: filter, first };

  const { data, error, loading, fetchMore, ...result } = useQuery(
    GET_REPOSITORIES,
    {
      fetchPolicy: 'cache-and-network',
      variables,
    }
  );

  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.repositories.pageInfo.hasNextPage;
    if (!canFetchMore) {
      return;
    }

    fetchMore({
      variables: {
        after: data.repositories.pageInfo.endCursor,
        ...variables,
      },
    });
  };

  return {
    repositories: data?.repositories,
    fetchMore: handleFetchMore,
    error,
    loading,
    ...result,
  };
};

export default useRepositories;
