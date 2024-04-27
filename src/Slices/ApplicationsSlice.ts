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

interface ApplicationData {
  id: number;
  status: string;
  creationDate: string;
  publicationDate: string;
  approvingDate: string;
}

interface DataState {
  currentApplicationId: number | null;
  currentApplicationDate: string;
  subscriptionsFromApplication: SubscriptionData[];
  applications: ApplicationData[];
}

const dataSlice = createSlice({
  name: "data",
  initialState: {
    currentApplicationId: null,
    currentApplicationDate: '',
    subscriptionsFromApplication: [],
    applications: []
  } as DataState,
  reducers: {
    setCurrentApplicationId(state, action: PayloadAction<number>) {
      state.currentApplicationId = action.payload;
    },
    setCurrentApplicationDate(state, action: PayloadAction<string>) {
      state.currentApplicationDate = action.payload;
    },
    setSubscriptionsFromApplication(state, action: PayloadAction<SubscriptionData[]>) {
      state.subscriptionsFromApplication = action.payload;
    },
    setApplications(state, action: PayloadAction<ApplicationData[]>) {
      state.applications = action.payload;
      console.log('applications is', action.payload)
    }
  },
});

export const useCurrentApplicationId = () =>
  useSelector((state: { applicationsData: DataState }) => state.applicationsData.currentApplicationId);

export const useCurrentApplicationDate = () =>
  useSelector((state: { applicationsData: DataState }) => state.applicationsData.currentApplicationDate);

export const useSubscripitonsFromApplication = () =>
  useSelector((state: { applicationsData: DataState }) => state.applicationsData.subscriptionsFromApplication);

export const useApplications = () =>
  useSelector((state: { applicationsData: DataState }) => state.applicationsData.applications);

export const {
    setCurrentApplicationId: setCurrentApplicationIdAction,
    setCurrentApplicationDate: setCurrentApplicationDateAction,
    setSubscriptionsFromApplication: setSubscriptionsFromApplicationAction,
    setApplications: setApplicationsAction

} = dataSlice.actions;

export default dataSlice.reducer;