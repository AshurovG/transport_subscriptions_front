import { HashRouter, Routes, Route } from 'react-router-dom'
// import styles from './App.module.scss'
import React from 'react';
import MainPage from 'pages/MainPage';
import DetaliedPage from 'pages/DetaliedPage';
import RegistrationPage from 'pages/RegistrationPage';
import LoginPage from 'pages/LoginPage';
import axios, {AxiosResponse} from 'axios';
import Cookies from "universal-cookie";
import {useDispatch} from "react-redux";
import {setUserAction, setIsAuthAction} from "../Slices/AuthSlice";

const cookies = new Cookies();

function App() {
  const dispatch = useDispatch();

  const getInitialUserInfo = async () => {
    console.log(cookies.get("session_id"))
    try {
      const response: AxiosResponse = await axios.get('http://127.0.0.1:8000/user_info',
      { 
        withCredentials: true, 
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: cookies.get("session_id"),
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

  React.useEffect(() => {
    if (cookies.get("session_id")) {
      getInitialUserInfo()
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

              <Route path='/registration' element={<RegistrationPage/>}></Route>
              <Route path='/login' element={<LoginPage/>}></Route>
          </Routes>
      </HashRouter>
    </div>
    );
  }
  
export default App;