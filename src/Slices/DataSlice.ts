import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

interface DataState {
  Data: number;
}

const dataSlice = createSlice({
  name: "data",
  initialState: {
    Data: 1,
  } as DataState,
  reducers: {
    setData(state, action: PayloadAction<number>) {
      state.Data = action.payload;
      console.log('action is', action)
      console.log('payload is', action.payload)
      console.log('state is', state.Data)
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

// Action, который будем применять в различных обработках
export const { 
    setData: setDataAction,
    incData: incDataAction,
    decData: decDataAction
} = dataSlice.actions;

export default dataSlice.reducer;