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
    isAuth: boolean,
    emailInputValue: string;
    fullnameInputValue: string;
    phoneNumberInputValue: string;
    passwordInputValue: string;
}

const dataSlice = createSlice({
  name: "data",
  initialState: {
    user: {},
    isAuth: false,
    emailInputValue: '',
    fullnameInputValue: '',
    phoneNumberInputValue: '',
    passwordInputValue: '',
  } as DataState,
  reducers: {
    setUser(state, action: PayloadAction<UserData>) {
      state.user = action.payload
    },
    setIsAuth(state, action: PayloadAction<boolean>) {
      state.isAuth = action.payload
      console.log(`is auth: ${action.payload}`)
    },
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
  setUser: setUserAction,
  setIsAuth: setIsAuthAction,
  setEmailInputValue: setEmailValueAction,
  setFullnameInputValue: setFullnameValueAction,
  setPhoneNumberInputValue: setPhoneNumberValueAction,
  setPasswordInputValue: setPasswordValueAction,
} = dataSlice.actions;

export default dataSlice.reducer;