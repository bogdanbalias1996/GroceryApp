import React, {FC, memo, useState} from 'react';
import {Keyboard} from 'react-native';
import {
  View,
  Text,
  Button,
  ButtonText,
  Card,
  ButtonIcon,
  TrashIcon,
  Switch,
  EditIcon,
  Input,
  InputField,
  CheckIcon,
} from '@gluestack-ui/themed';
import {useMutation, useQueryClient} from '@tanstack/react-query';

import {
  toggleItemBoughtFn,
  deleteItemFn,
  toggleAmountFn,
  updateItemNameFn,
} from '../../api';
import {GroceryCardPropsProps} from './types';
import styles from './styles';

const GroceryCard: FC<GroceryCardPropsProps> = ({
  item,
}: GroceryCardPropsProps) => {
  const [newItemName, setNewItemName] = useState(item.name);
  const [isEdit, setIsEdit] = useState(false);
  const queryClient = useQueryClient();

  const toggleItemBought = useMutation({
    mutationFn: item => toggleItemBoughtFn(item.id, !item.bought),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['groceryList']});
    },
  });

  const deleteItem = useMutation({
    mutationFn: deleteItemFn,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['groceryList']});
    },
  });

  const decreaseAmount = useMutation({
    mutationFn: item => toggleAmountFn(item.id, item.amount - 1),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['groceryList']});
    },
  });

  const increaseAmount = useMutation({
    mutationFn: item => toggleAmountFn(item.id, item.amount + 1),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['groceryList']});
    },
  });

  const updateItemName = useMutation({
    mutationFn: item => updateItemNameFn(item.id, newItemName),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['groceryList']});
    },
  });

  const updateItem = (): void => {
    updateItemName.mutate(item);
    setIsEdit(!isEdit);
    Keyboard.dismiss();
  };

  const renderTitle = (): JSX.Element =>
    isEdit ? (
      <Input minWidth={130}>
        <InputField
          value={newItemName}
          autoFocus
          placeholder="Enter item name"
          onChangeText={text => setNewItemName(text)}
        />
      </Input>
    ) : (
      <Text
        style={[
          styles.title,
          {
            textDecorationLine: item.bought ? 'line-through' : 'none',
          },
        ]}
        size="sm">
        {item.name}
      </Text>
    );

  const onEditPress = (): void => (isEdit ? updateItem() : setIsEdit(!isEdit));

  // Prevent negative amount of items
  const decreaseFn = (): void => {
    item.amount >= 2 && decreaseAmount.mutate(item);
  };

  return (
    <Card size="md" variant="elevated" m="$3">
      <View style={styles.topContainer}>
        <View style={styles.titleContainer}>
          <Switch
            onChange={() => toggleItemBought.mutate(item)}
            value={item.bought}
          />
          {renderTitle()}
        </View>
        <View style={styles.titleContainer}>
          <Button size="sm" action="secondary" onPress={onEditPress}>
            <ButtonIcon as={isEdit ? CheckIcon : EditIcon} />
          </Button>
          <Button
            size="sm"
            action="negative"
            onPress={() => deleteItem.mutate(item.id)}>
            <ButtonIcon as={TrashIcon} />
          </Button>
        </View>
      </View>
      <View style={styles.bottomContainer}>
        <Button size="xs" action="negative" onPress={decreaseFn}>
          <ButtonText>-</ButtonText>
        </Button>
        <Text style={styles.amountText} bold={true}>
          {item.amount}
        </Text>
        <Button
          size="xs"
          action="positive"
          onPress={() => increaseAmount.mutate(item)}>
          <ButtonText>+</ButtonText>
        </Button>
      </View>
    </Card>
  );
};

export default memo(GroceryCard);
