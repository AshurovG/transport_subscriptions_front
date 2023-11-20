import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

interface UserData {
  email: string;
  fullname: string;
  phoneNumber: string;
  isSuperuser: boolean
}

interface DataState {
    user: UserData,
    isAuth: boolean,
    isProfileButtonClicked: boolean,
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
    isProfileButtonClicked: false,
    emailInputValue: '',
    fullnameInputValue: '',
    phoneNumberInputValue: '',
    passwordInputValue: '',
  } as DataState,
  reducers: {
    setUser(state, action: PayloadAction<UserData>) {
      state.user = action.payload
      console.log(`user is ${action.payload.email}`)
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
    setIsProfileButtonClicked(state, action: PayloadAction<boolean>) {
      state.isProfileButtonClicked = action.payload;
    }
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

export const useIsAuth = () =>
  useSelector((state: { authData: DataState }) => state.authData.isAuth);

export const useIsProfileButtonclicked = () =>
  useSelector((state: { authData: DataState }) => state.authData.isProfileButtonClicked);

export const {
  setUser: setUserAction,
  setIsAuth: setIsAuthAction,
  setEmailInputValue: setEmailValueAction,
  setFullnameInputValue: setFullnameValueAction,
  setPhoneNumberInputValue: setPhoneNumberValueAction,
  setPasswordInputValue: setPasswordValueAction,
  setIsProfileButtonClicked: setIsProfileButtonClickedAction
} = dataSlice.actions;

export default dataSlice.reducer;