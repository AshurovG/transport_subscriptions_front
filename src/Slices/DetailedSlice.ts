import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

interface SubscriptionData {
  id: number,
  title: string,
  price: number,
  info: string,
  src: string,
  categoryTitle: string
}

interface DataState {
  subscription: SubscriptionData
}

const dataSlice = createSlice({
  name: "data",
  initialState: {
    subscription: {}
  } as DataState,
  reducers: {
    setSubscription(state, action: PayloadAction<SubscriptionData>) {
        console.log('pay is -', action.payload)
        state.subscription = action.payload
    },
  },
});

export const useSubscription = () =>
  useSelector((state: { detailedData: DataState }) => state.detailedData.subscription);

export const {
    setSubscription: setSubscriptionAction,
} = dataSlice.actions;

export default dataSlice.reducer;