import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

interface CategoryData {
  id: number,
  title: string
}

interface DataState {
  Data: number;
  categories: CategoryData[];
  categoryValue: string;
}

const dataSlice = createSlice({
  name: "data",
  initialState: {
    Data: 1,
    categories: [],
    categoryValue: 'Все категории'
  } as DataState,
  reducers: {
    setData(state, action: PayloadAction<number>) {
      state.Data = action.payload;
      console.log('action is', action)
      console.log('payload is', action.payload)
      console.log('state is', state.Data)
    },
    setCategories(state, action: PayloadAction<CategoryData[]>) {
      state.categories = action.payload
    },
    setCategoryValue(state, action: PayloadAction<string>) {
      console.log('pay is', action.payload)
      state.categoryValue = action.payload
    },
    incData(state) {
        state.Data++
    },
    decData(state) {
        state.Data--
    }
  },
});

// Состояние, которое будем отображать в компонентах
export const useData = () =>
  useSelector((state: { ourData: DataState }) => state.ourData.Data);

export const useCategories = () =>
  useSelector((state: { ourData: DataState }) => state.ourData.categories);

export const useCategoryValue = () =>
  useSelector((state: { ourData: DataState }) => state.ourData.categoryValue);

// Action, который будем применять в различных обработках
export const {
    setData: setDataAction,
    incData: incDataAction,
    decData: decDataAction,
    setCategories: setCategoriesAction,
    setCategoryValue: setCategoryValueAction
} = dataSlice.actions;

export default dataSlice.reducer;