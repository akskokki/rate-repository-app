import { FlatList, View, StyleSheet, Pressable } from 'react-native';
import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';
import { useNavigate } from 'react-router-native';
import { Picker } from '@react-native-picker/picker';
import { useState } from 'react';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryListHeader = ({ order, setOrder }) => {
  const handleChange = (value) => {
    setOrder(value);
  };

  return (
    <View>
      <Picker selectedValue={order} onValueChange={handleChange}>
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
  navigate,
  order,
  setOrder,
}) => {
  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

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
      ListHeaderComponent={() => (
        <RepositoryListHeader order={order} setOrder={setOrder} />
      )}
    />
  );
};

const RepositoryList = () => {
  const [order, setOrder] = useState('latest');
  const { repositories } = useRepositories(order);
  const navigate = useNavigate();

  return (
    <RepositoryListContainer
      repositories={repositories}
      navigate={navigate}
      order={order}
      setOrder={setOrder}
    />
  );
};

export default RepositoryList;
