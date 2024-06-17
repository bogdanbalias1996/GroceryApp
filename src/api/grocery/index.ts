import {GroceryItem} from '../../components/CroceryCard/types';
import {api} from '../api';
import {GroceryEndpoints} from './endpoint';

export const toggleItemBoughtFn = (
  itemId: number,
  bought: boolean,
): Promise<void> =>
  api.patch(`${GroceryEndpoints.GROCERY_LIST}/${itemId}`, {
    bought: bought,
  });
export const deleteItemFn = (itemId: number): Promise<void> =>
  api.delete(`${GroceryEndpoints.GROCERY_LIST}/${itemId}`);
export const addGroceryItemFn = (newItem: any): Promise<GroceryItem> =>
  api.post(`${GroceryEndpoints.GROCERY_LIST}`, newItem);
export const getGroceryListFn = (): Promise<GroceryItem[]> =>
  api.get(`${GroceryEndpoints.GROCERY_LIST}`);
export const toggleAmountFn = (id: number, amount: number): Promise<void> =>
  api.patch(`${GroceryEndpoints.GROCERY_LIST}/${id}`, {amount: amount});
export const updateItemNameFn = (
  itemId: number,
  newName: string,
): Promise<void> =>
  api.patch(`${GroceryEndpoints.GROCERY_LIST}/${itemId}`, {
    name: newName,
  });
