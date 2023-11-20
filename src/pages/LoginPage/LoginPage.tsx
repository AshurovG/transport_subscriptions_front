import * as React from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form';
import Header from 'components/Header';
import BreadCrumbs from 'components/BreadCrumbs';
import Image from "react-bootstrap/Image"
import styles from './LoginPage.module.scss'
import axios, { AxiosResponse } from 'axios';
import { ChangeEvent } from 'react';
import {useDispatch} from "react-redux";
import {useEmailInputValue, usePasswordInputValue, setEmailValueAction, 
    setPasswordValueAction, setUserAction, setIsAuthAction} from "../../Slices/AuthSlice";

const LoginPage: React.FC = () => {
    const dispatch = useDispatch();
    const emailValue = useEmailInputValue();
    const passwordValue = usePasswordInputValue();

    // React.useEffect(() => {
    //     return () => {
    //         dispatch(setEmailValueAction(''))
    //         dispatch(setPasswordValueAction(''))
    //     }
    // }, [])

    const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            const formData = new FormData();
            formData.append('email', emailValue);
            formData.append('password', passwordValue);

            console.log('formdata is', formData)
        
            const response: AxiosResponse = await axios.post('http://localhost:8000/login', formData, {
                withCredentials: true
            });
            console.log(response.data)

            dispatch(setIsAuthAction(true))

            dispatch(setUserAction({
                email: response.data.email,
                fullname: response.data.full_name,
                phoneNumber: response.data.phone_number,
                isSuperuser: response.data.is_superuser
            }));

        } catch (error) {
            throw error
        }
    };

    const handleEmailValueChange = (event: ChangeEvent<HTMLInputElement>) => {
        dispatch(setEmailValueAction(event.target.value));
    };

    const handlePasswordValueChange = (event: ChangeEvent<HTMLInputElement>) => {
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
                    <h3 className={styles.content__title}>Вход</h3>
                    <div className={styles.form__item}>
                        <Form.Group style={{height: 50}} className='w-100 mb-3' controlId="search__sub.input__sub">
                            <Form.Control value={emailValue} onChange={handleEmailValueChange} style={{height: '100%', borderColor: '#3D348B', fontSize: 18}} type="email" placeholder="E-mail..." />
                        </Form.Group>
                    </div>
                    <div className={styles.form__item}>
                        <Form.Group style={{height: 50}} className='w-100 mb-3' controlId="search__sub.input__sub">
                            <Form.Control value={passwordValue} onChange={handlePasswordValueChange} style={{height: '100%', borderColor: '#3D348B', fontSize: 18}} type="password" placeholder="Пароль..." />
                        </Form.Group>
                    </div>
                    
                    <Button type='submit' style={{backgroundColor: "#2787F5", padding: "10px 20px", borderColor: "#000", fontSize: 18, height: 50}}>Войти</Button>
                    <Link className={styles.content__link} to='/registration'>У вас еще нет аккаунта?</Link>
                </Form>
            </div>
        </div>
    )
};
  
export default LoginPage;