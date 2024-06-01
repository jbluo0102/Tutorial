import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// State var
const foodStore = createSlice({
  name: "foods",
  initialState: {
    foodsList: [],
    activeIndex: 0,
    cartList: [],
  },
  reducers: {
    setFoodsList(state, action) {
      state.foodsList = action.payload;
    },
    setActiveIndex(state, action) {
      state.activeIndex = action.payload;
    },
    addCart(state, action) {
      const item = state.cartList.find((item) => item.id === action.payload.id);
      if (item) {
        item.count++;
      } else {
        state.cartList.push(item);
      }
    },
  },
});

const reducers = foodStore.reducer;
const { setFoodsList, setActiveIndex, addCart } = foodStore.actions;

// Fetch data method
const fetchFoodList = () => {
  return async (dispatch) => {
    const res = await axios.get("http://localhost:3004/takeaway");
    dispatch(setFoodsList(res.data));
    console.log("[DEBUG] Fetch data", res.data);
  };
};

export { fetchFoodList, setActiveIndex, addCart };
export default reducers;
