import { createSlice } from '@reduxjs/toolkit';

// TODO: remove this once apis are connected

export const productSlice = createSlice({
  name: 'products',
  initialState: {
    allProducts: [], //New Arrival Page Connect
    getAllProductData: [], //Category Wise Product Data Store
    wishlistProducts: [], //Wishlist Data Store
    productRatingImageArray: [],
  },
  reducers: {
    wishlistProducts: (state, action) => {
      const data = action.payload;
      state.wishlistProducts = data;
    },
    getAllProductData: (state, action) => {
      const data = action.payload;
      state.getAllProductData = data;
    },
    addtoWishlist: (state, action) => {
      const { product_id, user } = action.payload;
      if (!product_id) return;
      const wishlistedProduct = state.wishlistProducts.find(
        item => item.product_id === product_id,
      );

      if (wishlistedProduct) {
        return;
      } else {
        state.wishlistProducts.push({ ...action.payload, is_wishlisted: true });
      }
    },
    removefromWishlist: (state, action) => {
      const { product_id, user } = action.payload;
      if (!product_id) return;
      //find item index
      const wishlistedProduct = state.wishlistProducts.findIndex(
        item => item.product_id === product_id,
      );
      //remove wishlist item by id
      state.wishlistProducts.splice(wishlistedProduct, 1);
    },
    ratingImageArray: (state, action) => {
      state.productRatingImageArray = action.payload;
    },
  },
});

export const {
  addtoWishlist,
  removefromWishlist,
  getAllProductData,
  wishlistProducts,
  ratingImageArray,
} = productSlice.actions;

export default productSlice.reducer;
