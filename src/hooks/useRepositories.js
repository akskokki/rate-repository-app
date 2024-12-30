import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = (order, filter) => {
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

  const { data, error, loading } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network',
    variables: { ...orderVars, searchKeyword: filter },
  });

  const repositories = data ? data.repositories : null;

  return { repositories, error, loading };
};

export default useRepositories;
