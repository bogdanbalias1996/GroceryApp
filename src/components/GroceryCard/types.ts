export type GroceryCardPropsProps = {
  item: GroceryItem;
};

export type GroceryItem = {
  id: number;
  name: string;
  amount: number;
  bought: boolean;
};
