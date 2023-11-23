import { HashRouter, Routes, Route, Navigate } from 'react-router-dom'
// import styles from './App.module.scss'
import React from 'react';
import MainPage from 'pages/MainPage';
import DetaliedPage from 'pages/DetaliedPage';
import RegistrationPage from 'pages/RegistrationPage';
import LoginPage from 'pages/LoginPage';
import CurrentApplicationPage from 'pages/CurrentApplicationPage';
import axios, {AxiosResponse} from 'axios';
import Cookies from "universal-cookie";
import {useDispatch} from "react-redux";
import {setUserAction, setIsAuthAction, useIsAuth} from "../Slices/AuthSlice";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const cookies = new Cookies();

function App() {
  const dispatch = useDispatch();
  const isAuth = useIsAuth();

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
      console.log(response.data)
    } catch {

    }
  }

  React.useEffect(() => {
    if (cookies.get("session_id")) {
      getInitialUserInfo()
      getAllApplications()
    }
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
              {/* {<Route path='/registration' element={<RegistrationPage/>}></Route>} */}
              {!isAuth && <Route path='/login' element={<LoginPage/>}></Route>}
              {isAuth && <Route path='/application' element={<CurrentApplicationPage/>}/>}
              <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
      </HashRouter>
      <ToastContainer autoClose={1500} pauseOnHover={false} />
    </div>
    );
  }
  
export default App;