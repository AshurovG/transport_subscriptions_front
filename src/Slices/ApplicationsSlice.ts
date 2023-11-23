import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";



interface DataState {
  currentApplicationId: number | null,
}

const dataSlice = createSlice({
  name: "data",
  initialState: {
    currentApplicationId: null
  } as DataState,
  reducers: {
    setCurrentApplicationId(state, action: PayloadAction<number>) {
        state.currentApplicationId = action.payload
        console.log('application id is', action.payload)
    },
  },
});

export const useCurrentApplicationId = () =>
  useSelector((state: { applicationsData: DataState }) => state.applicationsData.currentApplicationId);

export const {
    setCurrentApplicationId: setCurrentApplicationIdAction,
} = dataSlice.actions;

export default dataSlice.reducer;