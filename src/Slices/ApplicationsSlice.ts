import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

interface SubscriptionData {
  id: number;
  title: string;
  price: number;
  info: string;
  src: string;
  categoryTitle: string;
}

interface DataState {
  currentApplicationId: number | null;
  currentApplicationDate: string;
  subscriptionsFromApplication: SubscriptionData[];
}

const dataSlice = createSlice({
  name: "data",
  initialState: {
    currentApplicationId: null,
    currentApplicationDate: '',
    subscriptionsFromApplication: []
  } as DataState,
  reducers: {
    setCurrentApplicationId(state, action: PayloadAction<number>) {
      state.currentApplicationId = action.payload;
    },
    setCurrentApplicationDate(state, action: PayloadAction<string>) {
      state.currentApplicationDate = action.payload;
      console.log('application date is', action.payload)
    },
    setSubscriptionsFromApplication(state, action: PayloadAction<SubscriptionData[]>) {
      state.subscriptionsFromApplication = action.payload;
      console.log('subs is', action.payload)
    }
  },
});

export const useCurrentApplicationId = () =>
  useSelector((state: { applicationsData: DataState }) => state.applicationsData.currentApplicationId);

export const useCurrentApplicationDate = () =>
  useSelector((state: { applicationsData: DataState }) => state.applicationsData.currentApplicationDate);

export const useSubscripitonsFromApplication = () =>
  useSelector((state: { applicationsData: DataState }) => state.applicationsData.subscriptionsFromApplication);

export const {
    setCurrentApplicationId: setCurrentApplicationIdAction,
    setCurrentApplicationDate: setCurrentApplicationDateAction,
    setSubscriptionsFromApplication: setSubscriptionsFromApplicationAction

} = dataSlice.actions;

export default dataSlice.reducer;