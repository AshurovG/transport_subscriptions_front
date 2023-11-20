import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

interface UserData {
  id: number;
  email: string;
  fullname: string;
  phoneNumber: string;
  password: string;
  isSuperuser?: boolean
}

interface DataState {
    user: UserData,
    emailInputValue: string;
    fullnameInputValue: string;
    phoneNumberInputValue: string;
    passwordInputValue: string;
}

const dataSlice = createSlice({
  name: "data",
  initialState: {
    user: {}
  } as DataState,
  reducers: {
    setEmailInputValue(state, action: PayloadAction<string>) {
        state.emailInputValue = action.payload
    },
    setFullnameInputValue(state, action: PayloadAction<string>) {
        state.fullnameInputValue = action.payload
    },
    setPhoneNumberInputValue(state, action: PayloadAction<string>) {
        state.phoneNumberInputValue = action.payload
    },
    setPasswordInputValue(state, action: PayloadAction<string>) {
        state.passwordInputValue = action.payload
    },
    setUser(state, action: PayloadAction<UserData>) {
      state.user = action.payload
    },
  },
});

export const useEmailInputValue = () =>
  useSelector((state: { authData: DataState }) => state.authData.emailInputValue);

export const useFullnameInputValue = () =>
  useSelector((state: { authData: DataState }) => state.authData.fullnameInputValue);

export const usePhoneNumberInputValue = () =>
  useSelector((state: { authData: DataState }) => state.authData.phoneNumberInputValue);

export const usePasswordInputValue = () =>
  useSelector((state: { authData: DataState }) => state.authData.passwordInputValue);

export const useUser = () =>
  useSelector((state: { authData: DataState }) => state.authData.user);

export const {
    setEmailInputValue: setEmailValueAction,
    setFullnameInputValue: setFullnameValueAction,
    setPhoneNumberInputValue: setPhoneNumberValueAction,
    setPasswordInputValue: setPasswordValueAction,
    setUser: setUserAction
} = dataSlice.actions;

export default dataSlice.reducer;