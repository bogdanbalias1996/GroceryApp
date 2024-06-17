import React, {useState} from 'react';
import {Platform} from 'react-native';
import {
  SafeAreaView,
  Text,
  Button,
  ButtonText,
  FlatList,
  Input,
  InputField,
  Center,
  KeyboardAvoidingView,
} from '@gluestack-ui/themed';
import {useQuery, useMutation, useQueryClient} from '@tanstack/react-query';

import {GroceryCard} from '../../components';
import {addGroceryItemFn, getGroceryListFn} from '../../api';
import {GroceryItem} from '../../components/GroceryCard/types';
import styles from './style';

const GroceryListScreen = () => {
  const [newItemName, setNewItemName] = useState('');
  const queryClient = useQueryClient();

  const {data: groceryList, isLoading} = useQuery({
    queryKey: ['groceryList'],
    queryFn: () => getGroceryListFn().then(res => res.data),
  });

  const addGroceryItem = useMutation({
    mutationFn: addGroceryItemFn,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['groceryList']});
    },
  });

  const renderItem = ({item}: {item: GroceryItem}): Element => (
    <GroceryCard item={item} />
  );

  const keyExtractor = (item: GroceryItem): string => item.id.toString();

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior="padding"
        enabled={Platform.OS === 'ios'}
        flex={1}>
        <Center>
          <Text size="lg" bold>
            My Grocery List
          </Text>
        </Center>
        <FlatList
          data={groceryList}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          refreshing={isLoading}
          onRefresh={() => queryClient.invalidateQueries('groceryList')}
        />
        <Input>
          <InputField
            placeholder="Enter item name"
            onChangeText={text => setNewItemName(text)}
          />
        </Input>
        <Button
          size="md"
          variant="solid"
          action="primary"
          isDisabled={Boolean(!newItemName.length)}
          marginVertical={15}
          onPress={() =>
            addGroceryItem.mutate({name: newItemName, amount: 1, bought: false})
          }>
          <ButtonText>Add Item </ButtonText>
        </Button>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default GroceryListScreen;
