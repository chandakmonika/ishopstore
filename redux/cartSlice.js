import { createSlice } from '@reduxjs/toolkit';

export const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    isCartOpen: false,
    totalCartValue: '',
    totalItem: null,
  },
  reducers: {
    cartItemList: (state, action) => {
      const data = action.payload;
      state.items = data;
    },
    addToCart: (state, action) => {
      const {
        product_id,
        user_id,
        product_name,
        product_image,
        product_price,
      } = action.payload;
      if (!product_id) return;
      // check if product is already there
      const item = state.items.find(p => p.product_id === product_id);

      // if product exist in the card do nothing
      if (item) return;

      state.items = [
        ...state.items,
        {
          product_id,
          product_qty: 1,
          user_id,
          product_name,
          product_image,
          product_price,
        },
      ];
    },
    increaseQuantity: (state, action) => {
      const product_id = action.payload;
      
      // check if product is  in card
      const item = state.items.find(p => p.product_id === product_id);
      console.log(7612, state.items, item, product_id);

      // if product exist in the card do nothing
      if (!item) return;

      item.product_qty++;
    },
    decreaseQuantity: (state, action) => {
      const product_id = action.payload;
      console.log(5434, product_id);
      // check if product is  in card
      const item = state.items.find(p => p.product_id === product_id);

      // if product does not exist in the card do nothing
      if (!item) return;

      // remove product from cart user tries to decrease qty from 1 to 0
      if (item.product_qty === 1) {
        state.items = state.items.filter(
          item => item.product_id !== product_id,
        );
      }

      // when quantity is greater than 1
      item.product_qty--;
    },
    toggleCartModal: (state, action) => {
      state.isCartOpen = action.payload;
    },
    removeToCart: (state, action) => {
      const product_id = action.payload;
      // check if product is  in card
      const item = state.items.find(p => p.product_id === product_id);
      // if product exist in the card do nothing
      if (!item) return;
      state.items = state.items.filter(item => item.product_id !== product_id);
    },
    totalCartAmount: (state, action) => {
      state.totalCartValue = action.payload;
    },
    totalCartItems: (state, action) => {
      state.totalItem = action.payload;
    },
  },
});

export const {
  addToCart,
  increaseQuantity,
  decreaseQuantity,
  toggleCartModal,
  cartItemList,
  removeToCart,
  totalCartAmount,
  totalCartItems,
} = cartSlice.actions;

export default cartSlice.reducer;
