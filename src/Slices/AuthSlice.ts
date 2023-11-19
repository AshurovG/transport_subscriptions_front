import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

interface DataState {
    emailValue: string;
    fullnameValue: string;
    phoneNumberValue: string;
    passwordValue: string;
}

const dataSlice = createSlice({
  name: "data",
  initialState: {
    emailValue: '',
    fullnameValue: '',
    phoneNumberValue: '',
    passwordValue: ''
  } as DataState,
  reducers: {
    setEmailValue(state, action: PayloadAction<string>) {
        state.emailValue = action.payload
    },
    setFullnameValue(state, action: PayloadAction<string>) {
        state.fullnameValue = action.payload
    },
    setPhoneNumberValue(state, action: PayloadAction<string>) {
        state.phoneNumberValue = action.payload
    },
    setPasswordValue(state, action: PayloadAction<string>) {
        state.passwordValue = action.payload
    },
  },
});

export const useLinksMapData = () =>
  useSelector((state: { authDataReducer: DataState }) => state.authDataReducer.emailValue);

export const {
    setEmailValue: setEmailValueAction,
    setFullnameValue: setFullnameValueAction,
    setPhoneNumberValue: setPhoneNumberValueAction,
    setPasswordValue: setPasswordValueAction
} = dataSlice.actions;

export default dataSlice.reducer;