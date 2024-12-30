import { FlatList, View, StyleSheet, Pressable, TextInput } from 'react-native';
import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';
import { useNavigate } from 'react-router-native';
import { Picker } from '@react-native-picker/picker';
import { useMemo, useState } from 'react';
import theme from '../theme';
import React from 'react';
import { useDebounce } from 'use-debounce';
import ItemSeparator from './ItemSeparator';

const styles = StyleSheet.create({
  headerContainer: {
    display: 'flex',
    padding: theme.spacing.largeGap,
    gap: theme.spacing.largeGap,
  },
  searchBar: {
    backgroundColor: theme.colors.white,
    borderColor: theme.colors.textSecondary,
    borderWidth: 1,
    borderRadius: 5,
    height: 50,
    paddingLeft: 10,
  },
});

const RepositoryListHeader = ({ order, setOrder, filter, setFilter }) => {
  return (
    <View style={styles.headerContainer}>
      <TextInput
        placeholder="Search repositories..."
        value={filter}
        onChangeText={setFilter}
        style={styles.searchBar}
      />
      <Picker selectedValue={order} onValueChange={setOrder}>
        <Picker.Item label="Latest repositories" value={'latest'} />
        <Picker.Item
          label="Highest rated repositories"
          value={'highestRated'}
        />
        <Picker.Item label="Lowest rated repositories" value={'lowestRated'} />
      </Picker>
    </View>
  );
};

export const RepositoryListContainer = ({
  repositories,
  onEndReach,
  navigate,
  order,
  setOrder,
  filter,
  setFilter,
}) => {
  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  const renderHeader = useMemo(() => {
    return (
      <RepositoryListHeader
        order={order}
        setOrder={setOrder}
        filter={filter}
        setFilter={setFilter}
      />
    );
  }, [order, filter]);

  const renderItem = ({ item }) => {
    const handlePress = () => navigate(`/repositories/${item.id}`);

    return (
      <Pressable onPress={handlePress}>
        <RepositoryItem item={item} />
      </Pressable>
    );
  };

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      ListHeaderComponent={renderHeader}
      onEndReached={onEndReach}
      onEndReachedThreshold={0.2}
    />
  );
};

const RepositoryList = () => {
  const [order, setOrder] = useState('latest');
  const [filter, setFilter] = useState('');
  const [debouncedFilter] = useDebounce(filter, 500);
  const { repositories, fetchMore } = useRepositories(
    order,
    debouncedFilter,
    8
  );
  const navigate = useNavigate();

  const onEndReach = () => {
    fetchMore();
  };

  return (
    <RepositoryListContainer
      repositories={repositories}
      onEndReach={onEndReach}
      navigate={navigate}
      order={order}
      setOrder={setOrder}
      filter={filter}
      setFilter={setFilter}
    />
  );
};

export default RepositoryList;
