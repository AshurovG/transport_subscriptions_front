import * as React from 'react';
import { ChangeEvent } from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form';
import Header from 'components/Header';
import BreadCrumbs from 'components/BreadCrumbs';
import Image from "react-bootstrap/Image"
import styles from './RegistrationPage.module.scss'
import axios, { AxiosResponse } from 'axios';
import {useDispatch} from "react-redux";
import {useEmailInputValue, usePasswordInputValue, useFullnameInputValue, usePhoneNumberInputValue, setEmailValueAction, 
    setPasswordValueAction, setFullnameValueAction, setPhoneNumberValueAction, setUserAction, setIsAuthAction} from "../../Slices/AuthSlice";

const RegistrationPage: React.FC = () => {
    const dispatch = useDispatch();
    const emailValue = useEmailInputValue();
    const passwordValue = usePasswordInputValue();
    const fullnameValue = useFullnameInputValue();
    const phoneNumberValue = usePhoneNumberInputValue();

    const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      try {
        const formData = new FormData();
        formData.append('email', 'aaa@mail.ru');
        formData.append('password', 'password123');
    
        const response: AxiosResponse = await axios.post('http://localhost:8000/login', formData, {
          withCredentials: true, // Включаем передачу кук в запросах
        });
      } catch (error) {
        console.error('Ошибка при выполнении запроса:', error);
        throw(error)
      }
    };

    const handleEmailValueChange = (event: ChangeEvent<HTMLInputElement>) => {
        dispatch(setEmailValueAction(event.target.value));
    };

    const handlePasswordValueChange = (event: ChangeEvent<HTMLInputElement>) => {
        dispatch(setPasswordValueAction(event.target.value));
    };

    const handleFullnameValueChange = (event: ChangeEvent<HTMLInputElement>) => {
        dispatch(setFullnameValueAction(event.target.value));
    };

    const handlePhoneNumberValueChange = (event: ChangeEvent<HTMLInputElement>) => {
        dispatch(setPasswordValueAction(event.target.value));
    };

    return (
        <div className='main__page'>
            <Header/>
            <div style={{position: 'relative'}}className={styles['content']}>
                <Form onSubmit={handleFormSubmit}
                style={{backgroundColor: '#fff', width: '50%', padding: '60px 40px',
                margin: '0 auto', display: 'flex', flexDirection: 'column',
                boxShadow: '0px 4px 10px 0px rgba(0, 0, 0, 0.25)', borderRadius: '10px'}}>
                    <h3 className={styles.content__title}>Регистрация</h3>
                    <div className={styles.form__item}>
                        <Form.Group style={{height: 50}} className='w-100 mb-3' controlId="search__sub.input__sub">
                            <Form.Control onChange={handleEmailValueChange} value={emailValue} style={{height: '100%', borderColor: '#3D348B', fontSize: 18}} type="email" placeholder="E-mail..." />
                        </Form.Group>
                    </div>
                    <div className={styles.form__item}>
                        <Form.Group style={{height: 50}} className='w-100 mb-3' controlId="search__sub.input__sub">
                            <Form.Control onChange={handleFullnameValueChange} value={fullnameValue} style={{height: '100%', borderColor: '#3D348B', fontSize: 18}} type="text" placeholder="ФИО..." />
                        </Form.Group>
                    </div>
                    <div className={styles.form__item}>
                        <Form.Group style={{height: 50}} className='w-100 mb-3' controlId="search__sub.input__sub">
                            <Form.Control onChange={handlePhoneNumberValueChange} value={phoneNumberValue} style={{height: '100%', borderColor: '#3D348B', fontSize: 18}} type="tel" placeholder="Номер телефона..." />
                        </Form.Group>
                    </div>
                    <div className={styles.form__item}>
                        <Form.Group style={{height: 50}} className='w-100 mb-3' controlId="search__sub.input__sub">
                            <Form.Control onChange={handlePasswordValueChange} value={passwordValue} style={{height: '100%', borderColor: '#3D348B', fontSize: 18}} type="password" placeholder="Пароль..." />
                        </Form.Group>
                    </div>
                    
                    <Button type='submit' style={{backgroundColor: "#2787F5", padding: "10px 20px", borderColor: "#000", fontSize: 18, height: 50}}>Зарегистрироваться</Button>
                    <Link className={styles.content__link} to='/login'>У вас уже есть аккаунт?</Link>
                </Form>
            </div>
        </div>
    )
};
  
export default RegistrationPage;