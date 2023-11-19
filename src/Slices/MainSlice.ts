import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

interface CategoryData {
  id: number,
  title: string,
}

interface SubscriptionData {
  id: number,
  title: string,
  price: number,
  info: string,
  src: string,
  categoryTitle: string
}

interface DataState {
  Data: number;
  categories: CategoryData[];
  categoryValue: string;
  titleValue: string;
  subscriptions: SubscriptionData[],
  priceValues: number[]
}

const dataSlice = createSlice({
  name: "data",
  initialState: {
    Data: 1,
    categories: [],
    categoryValue: 'Все категории',
    titleValue: '',
    subscriptions: [],
    priceValues: [0, 9980]
  } as DataState,
  reducers: {
    setCategories(state, action: PayloadAction<CategoryData[]>) {
      state.categories = action.payload
    },
    setCategoryValue(state, action: PayloadAction<string>) {
      state.categoryValue = action.payload
    },
    setTitleValue(state, action: PayloadAction<string>) {
      state.titleValue = action.payload
    },
    setSubscriptions(state, action: PayloadAction<SubscriptionData[]>) {
      state.subscriptions = action.payload
    },
    setPriceValues(state, action: PayloadAction<number[]>) {
      console.log('pay is', action.payload)
      state.priceValues = action.payload
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

export const useSubscriptions = () =>
  useSelector((state: { ourData: DataState }) => state.ourData.subscriptions);

export const usePriceValues = () =>
  useSelector((state: { ourData: DataState }) => state.ourData.priceValues);

// Action, который будем применять в различных обработках
export const {
    setCategories: setCategoriesAction,
    setCategoryValue: setCategoryValueAction,
    setTitleValue: setTitleValueAction,
    setSubscriptions: setSubscriptionsAction,
    setPriceValues: setPriceValuesAction
} = dataSlice.actions;

export default dataSlice.reducer;