import { HashRouter, Routes, Route, Navigate } from 'react-router-dom'
// import styles from './App.module.scss'
import React from 'react';
import MainPage from 'pages/MainPage';
import DetaliedPage from 'pages/DetaliedPage';
import RegistrationPage from 'pages/RegistrationPage';
import LoginPage from 'pages/LoginPage';
import CurrentApplicationPage from 'pages/CurrentApplicationPage';
import ApplicationsListPage from 'pages/ApplicationsListPage';
import axios, {AxiosResponse} from 'axios';
import Cookies from "universal-cookie";
import {useDispatch} from "react-redux";
import {setUserAction, setIsAuthAction, useIsAuth} from "../Slices/AuthSlice";
import {setCategoriesAction, setSubscriptionsAction} from "Slices/MainSlice";
import { setCurrentApplicationIdAction } from 'Slices/ApplicationsSlice'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { mockSubscriptions } from '../../consts';
import { setApplicationsAction, setCurrentApplicationDateAction, setSubscriptionsFromApplicationAction } from 'Slices/ApplicationsSlice'
import { useCurrentApplicationId } from 'Slices/ApplicationsSlice'

const cookies = new Cookies();

export type ReceivedCategoryData = {
  id: number;
  title: string;
  status: string;
}

export type ReceivedSubscriptionData = {
  id: number;
  title: string;
  price: number;
  info: string;
  src: string;
  id_category: number;
  category: string;
}

export type ReceivedApplicationData = {
  id: number;
  status: string;
  creation_date: string;
  publication_date: string;
  approving_date: string;
}

function App() {
  const dispatch = useDispatch();
  const isAuth = useIsAuth();
  const currentApplicationId = useCurrentApplicationId()

  const getInitialUserInfo = async () => {
    console.log(cookies.get("session_id"))
    try {
      const response: AxiosResponse = await axios('http://localhost:8000/user_info',
      { 
        method: 'GET',
        withCredentials: true, 
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        },
      })
      dispatch(setIsAuthAction(true))
      dispatch(setUserAction({
        email: response.data.email,
        fullname: response.data.full_name,
        phoneNumber: response.data.phone_number,
        isSuperuser: response.data.is_superuser
      }))
      
    } 
    catch {
      console.log('Пользоатель не авторизован!!!')
    }
  }

  const getAllApplications = async () => {
    try {
      const response = await axios('http://localhost:8000/applications', {
        method: 'GET',
        withCredentials: true
      })
      const newArr = response.data.map((raw: ReceivedApplicationData) => ({
        id: raw.id,
        status: raw.status,
        creationDate: raw.creation_date,
        publicationDate: raw.publication_date,
        approvingDate: raw.approving_date,
    }));
    dispatch(setApplicationsAction(newArr))
    } catch(error) {
      throw error
    }
  }

  const getCategories = async () => {
    let url = 'http://127.0.0.1:8000/categories'
    try {
        const response = await axios.get(url)
        const categories = response.data.map((raw: ReceivedCategoryData) => ({
            id: raw.id,
            title: raw.title
        }))
        categories.unshift({ id: 100000, title: 'Все категории' });
        console.log(categories)
        dispatch(setCategoriesAction(categories))
    } catch {
        console.log('запрос не прошел !')
    }
  }

  const getSubscriptions = async () => {
    try {
        const response = await axios('http://localhost:8000/subscriptions', {
            method: 'GET',
            withCredentials: true 
        });
        const subscriptions = response.data.subscriptions;
        if (response.data.application_id) {
          getCurrentApplication(response.data.application_id);
          dispatch(setCurrentApplicationIdAction(response.data.application_id))
        }
        const newArr = subscriptions.map((raw: ReceivedSubscriptionData) => ({
            id: raw.id,
            title: raw.title,
            price: raw.price,
            info: raw.info,
            src: raw.src,
            categoryTitle: raw.category
        }));
        dispatch(setSubscriptionsAction(newArr));
    }
    catch {
      dispatch(setSubscriptionsAction(mockSubscriptions));
    }
};

const getCurrentApplication = async (id: number) => {
  try {
    const response = await axios(`http://localhost:8000/applications/${id}`, {
      method: 'GET',
      withCredentials: true,
    })
    dispatch(setCurrentApplicationDateAction(response.data.application.creation_date))
    const newArr = response.data.subscriptions.map((raw: ReceivedSubscriptionData) => ({
      id: raw.id,
      title: raw.title,
      price: raw.price,
      info: raw.info,
      src: raw.src,
      categoryTitle: raw.category
  }));

  dispatch(setSubscriptionsFromApplicationAction(newArr))
  } catch(error) {
    throw error;
  }
}

  // React.useEffect(() => {
    
  // }, [isAuth])

  React.useEffect(() => {
    if (cookies.get("session_id")) {
      getInitialUserInfo();
      getAllApplications();
    }
    getCategories();
    getSubscriptions();
  }, [])

  return (
    <div className='app'>
      <HashRouter>
          <Routes>
              <Route path="/" element={<MainPage />} />
              <Route path="/subscription">
                <Route path=":id" element={<DetaliedPage />} />
              </Route>
              {!isAuth && <Route path='/registration' element={<RegistrationPage/>}></Route>}
              {!isAuth && <Route path='/login' element={<LoginPage/>}></Route>}
              {isAuth && <Route path='/application' element={<CurrentApplicationPage/>}/>}
              {isAuth && <Route path='/applications' element={<ApplicationsListPage/>}/>}
              <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
      </HashRouter>
      <ToastContainer autoClose={1500} pauseOnHover={false} />
    </div>
    );
  }
  
export default App;