import FoodReducer from "./modules/takeaway";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: { foods: FoodReducer },
});

export default store;
