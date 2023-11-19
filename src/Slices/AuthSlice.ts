import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

interface DataState {
  LinksMapData: Map<string, string>
}

const dataSlice = createSlice({
  name: "data",
  initialState: {
    LinksMapData: new Map<string, string>([['Абонементы', '/']])
  } as DataState,
  reducers: {
    setLinksMapData(state, action: PayloadAction<Map<string, string>>) {
      console.log(action.payload)
      state.LinksMapData = action.payload
  },
  },
});

export const useLinksMapData = () =>
  useSelector((state: { authDataReducer: DataState }) => state.authDataReducer.LinksMapData);

export const {
    setLinksMapData: setLinksMapDataAction
} = dataSlice.actions;

export default dataSlice.reducer;