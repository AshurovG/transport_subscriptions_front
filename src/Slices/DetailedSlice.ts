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
  subscription: SubscriptionData;
  LinksMapData: Map<string, string>;
}

const dataSlice = createSlice({
  name: "data",
  initialState: {
    subscription: {},
    LinksMapData: new Map<string, string>([["Абонементы", "/"]]),
  } as DataState,
  reducers: {
    setSubscription(state, action: PayloadAction<SubscriptionData>) {
      state.subscription = action.payload;
    },
    setLinksMapData(state, action: PayloadAction<Map<string, string>>) {
      console.log(action.payload);
      state.LinksMapData = action.payload;
    },
  },
});

export const useSubscription = () =>
  useSelector(
    (state: { detailedData: DataState }) => state.detailedData.subscription
  );

export const useLinksMapData = () =>
  useSelector(
    (state: { detailedData: DataState }) => state.detailedData.LinksMapData
  );

export const {
  setSubscription: setSubscriptionAction,
  setLinksMapData: setLinksMapDataAction,
} = dataSlice.actions;

export default dataSlice.reducer;
