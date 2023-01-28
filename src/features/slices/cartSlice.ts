import { createSlice } from "@reduxjs/toolkit";
import { CartSliceInter, Product } from "../../interfaces";

const initialState: CartSliceInter = {
  data: [],
  total: 0,
};

const getTotal = (state: CartSliceInter) => {
  state.total = state.data
    .filter((item) => !item.isRemove)
    .reduce((total, item) => {
      if (item.subtotal) return total + item.subtotal;
      else return 0;
    }, 0);
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, { payload }) {
      const isExisting = state.data.find((c) => {
        if (c._id === payload._id && c.quantity) {
          c.quantity += payload?.quantity || 1;
          c.subtotal = c.quantity * c.price;
          c.isRemove = false;
          return true;
        }
      });
      if (isExisting) return;

      state.data.push({
        ...payload,
        quantity: payload?.quantity || 1,
        subtotal: payload?.quantity * payload?.price || payload?.price,
        isRemove: false,
      });
      getTotal(state);
    },

    delCart(state, { payload }) {
      const newCart = state.data.filter((c) => c._id !== payload._id);

      state.data = newCart;
    },

    softDelCart(state, { payload }) {
      const newCart = state.data.map((c) => {
        if (c._id === payload._id) {
          return {
            ...c,
            isRemove: true,
          };
        }
        return c;
      });

      state.data = newCart;
      getTotal(state);
    },

    recoverCart(state, { payload }) {
      const newCart = state.data.map((c) => {
        if (c._id === payload._id) {
          return {
            ...c,
            isRemove: false,
          };
        }
        return c;
      });

      state.data = newCart;
      
      getTotal(state);
    },

    updateCart(state, { payload }) {
      state.data = state.data.map((item) => {
        if (item._id === payload?._id) {
          return {
            ...item,
            quantity: payload?.quantity,
            subtotal: payload?.quantity * payload?.price,
          };
        }
        return item;
      });
      
      getTotal(state);
    },
  },
});

export const { addToCart, delCart, recoverCart, softDelCart, updateCart } =
  cartSlice.actions;
export default cartSlice.reducer;
