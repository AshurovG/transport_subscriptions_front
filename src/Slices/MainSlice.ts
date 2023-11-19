import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

interface CategoryData {
  id: number,
  title: string,
}

interface DataState {
  Data: number;
  categories: CategoryData[];
  categoryValue: string;
  titleValue: string;
}

const dataSlice = createSlice({
  name: "data",
  initialState: {
    Data: 1,
    categories: [],
    categoryValue: 'Все категории',
    titleValue: ''
  } as DataState,
  reducers: {
    setCategories(state, action: PayloadAction<CategoryData[]>) {
      state.categories = action.payload
    },
    setCategoryValue(state, action: PayloadAction<string>) {
      state.categoryValue = action.payload
    },
    setTitleValue(state, action: PayloadAction<string>) {
      console.log('pay is', action.payload)
      state.titleValue = action.payload
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
  
export const useTitleValue = () =>
  useSelector((state: { ourData: DataState }) => state.ourData.titleValue);

// Action, который будем применять в различных обработках
export const {
    setCategories: setCategoriesAction,
    setCategoryValue: setCategoryValueAction,
    setTitleValue: setTitleValueAction
} = dataSlice.actions;

export default dataSlice.reducer;