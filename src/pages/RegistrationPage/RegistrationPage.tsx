import * as React from 'react';
import { useState } from 'react';
import { ChangeEvent } from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form';
import Header from 'components/Header';
import BreadCrumbs from 'components/BreadCrumbs';
import Image from "react-bootstrap/Image"
import styles from './RegistrationPage.module.scss'
import axios, { AxiosResponse } from 'axios';
import { useDispatch } from "react-redux";
import { setUserAction, setIsAuthAction } from "../../Slices/AuthSlice";
import { toast } from 'react-toastify';

const RegistrationPage: React.FC = () => {
    const dispatch = useDispatch();
    const [emailValue, setEmailValue] = useState('')
    const [passwordValue, setPasswordValue] = useState('')
    const [fullnameValue, setFullnameValue] = useState('')
    const [phoneNumberValue, setPhoneNumberValue] = useState('')
    const [passwordError, setPasswordError] = useState('')
    const [emailError, setEmailError] = useState('')
    const [fullnameError, setFullnameError] = useState('')
    const [phoneNumberError, setPhoneNumberError] = useState('')

    const emailValidation = (value: string): void => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value) && value.length !== 0) {
            setEmailError('Неправильный формат email!');
        } else if(value.length === 0)  {
            setEmailError('Это обязательное поле!');
        } else {
            setEmailError('');
        }
    };

    const  passwordValidation = (value: string): void => {
        if ((value.length < 8 || value.length > 20) && value.length !== 0) {
            setPasswordError('Пароль должен быть от 8 до 20 символов!');
        } else if (value.length === 0) {
            setPasswordError('Это обязательное поле!');
        } else {
            setPasswordError('');
        }
    }

    const fullnameValidation = (value: string): void => {
        const words = value.trim().split(/\s+/);
        if ((words.length < 2 || words.length > 5) && value.length !== 0) {
            setFullnameError('ФИО быть от 2 до 5 слов!');
        } else if (value.length === 0) {
            setFullnameError('Это обязательное поле!');
        } else {
            setFullnameError('');
        }
    };

      const phoneNumberValidation = (value: string): void => {
        const phoneRegex = /^\+?\d{11}$/;
        if (value.length === 0) {
          setPhoneNumberError('Это обязательное поле!');
        } else if (!phoneRegex.test(value)) {
          setPhoneNumberError('Неправильный формат номера телефона!');
        } else {
          setPhoneNumberError('');
        }
      };

    const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      try {
        const formData = new FormData();
        formData.append('email', emailValue);
        formData.append('full_name', fullnameValue)
        formData.append('phone_number', phoneNumberValue)
        formData.append('password', passwordValue);
        const response: AxiosResponse = await axios.post('http://localhost:8000/user/', formData, {
          withCredentials: true, // Включаем передачу кук в запросах
        });

        dispatch(setIsAuthAction(true))

        dispatch(setUserAction({
            email: response.data.email,
            fullname: response.data.full_name,
            phoneNumber: response.data.phone_number,
            isSuperuser: response.data.is_superuser
        }));

        toast.success("Вы успешно зарегистрировались");
      } catch (error) {
        console.error('Ошибка при выполнении запроса:', error);
        throw(error)
      }
    };

    const handleEmailValueChange = (event: ChangeEvent<HTMLInputElement>) => {
        emailValidation(event.target.value)
        setEmailValue(event.target.value)
    };

    const handlePasswordValueChange = (event: ChangeEvent<HTMLInputElement>) => {
        passwordValidation(event.target.value)
        setPasswordValue(event.target.value)
    };

    const handleFullnameValueChange = (event: ChangeEvent<HTMLInputElement>) => {
        fullnameValidation(event.target.value)
        setFullnameValue(event.target.value)
    };

    const handlePhoneNumberValueChange = (event: ChangeEvent<HTMLInputElement>) => {
        phoneNumberValidation(event.target.value)
        setPhoneNumberValue(event.target.value)
    };

    return (
        <div className='main__page'>
            <Header/>
            <div style={{position: 'relative'}}className={styles['content']}>
                <Form onSubmit={handleFormSubmit}
                style={{backgroundColor: '#fff', width: '40%', padding: '60px 40px',
                margin: '0 auto', display: 'flex', flexDirection: 'column',
                boxShadow: '0px 4px 10px 0px rgba(0, 0, 0, 0.25)', borderRadius: '10px'}}>
                    <h3 className={styles.content__title}>Регистрация</h3>
                    <div className={styles.form__item}>
                        <Form.Group style={{height: 50}} className='w-100 mb-3' controlId="search__sub.input__sub">
                            <Form.Control onChange={handleEmailValueChange} value={emailValue} style={{height: '100%', borderColor: '#3D348B', fontSize: 18}} type="email" placeholder="E-mail..." />
                            <span className={styles['form__item-error']}>{emailError}</span>
                        </Form.Group>
                    </div>
                    <div className={styles.form__item}>
                        <Form.Group style={{height: 50}} className='w-100 mb-3' controlId="search__sub.input__sub">
                            <Form.Control onChange={handleFullnameValueChange} value={fullnameValue} style={{height: '100%', borderColor: '#3D348B', fontSize: 18}} type="text" placeholder="ФИО..." />
                            <span className={styles['form__item-error']}>{fullnameError}</span>
                        </Form.Group>
                    </div>
                    <div className={styles.form__item}>
                        <Form.Group style={{height: 50}} className='w-100 mb-3' controlId="search__sub.input__sub">
                            <Form.Control onChange={handlePhoneNumberValueChange} value={phoneNumberValue} style={{height: '100%', borderColor: '#3D348B', fontSize: 18}} type="tel" placeholder="Номер телефона..." />
                            <div className={styles['form__item-error']}>{phoneNumberError}</div>
                        </Form.Group>
                    </div>
                    <div className={styles.form__item}>
                        <Form.Group style={{height: 50}} className='w-100 mb-3' controlId="search__sub.input__sub">
                            <Form.Control onChange={handlePasswordValueChange} value={passwordValue} style={{height: '100%', borderColor: '#3D348B', fontSize: 18}} type="password" placeholder="Пароль..." />
                            <span className={styles['form__item-error']}>{passwordError}</span>
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