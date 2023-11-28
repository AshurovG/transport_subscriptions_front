import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom'
import styles from './Header.module.scss'
import ProfileIcon from 'components/Icons/ProfileIcon';
import ApplicationIcon from 'components/Icons/ApplicationIcon';
import ProfileWindow from "components/ProfileWindow";
import BurgerIcon from 'components/Icons/BurgerIcon';
import { motion, AnimatePresence } from "framer-motion";
import axios, {AxiosResponse} from 'axios';
import {useDispatch} from "react-redux";
import {useUser, useIsAuth, setIsAuthAction, setUserAction} from "../../Slices/AuthSlice";
import Cookies from "universal-cookie";
import { toast } from 'react-toastify';
import { useSubscripitonsFromApplication } from 'Slices/ApplicationsSlice';

const cookies = new Cookies();

const Header: React.FC = () => {
    const dispatch = useDispatch();
    const [isProfileButtonClicked, setIsProfileButtonClicked] = useState(false);
    const [isBurgerMenuOpened, setIsBurgerMenuOpened] = useState(false)
    const isUserAuth = useIsAuth();
    const subscriptionsFromApplications = useSubscripitonsFromApplication();
    let user = useUser();

    const handleProfileButtonClick = () => {
        setIsProfileButtonClicked(!isProfileButtonClicked);
    };

    const logout = async () => {
        try {
            console.log(cookies.get('session_id'))
            const response: AxiosResponse = await axios('http://localhost:8000/logout',
            {
                method: "POST",
                withCredentials: true,
                headers: { 
                    "Content-type": "application/json; charset=UTF-8"
                }, 
            })

            cookies.remove("session_id", { path: "/" }); 

            dispatch(setIsAuthAction(false))
            dispatch(setUserAction({
                email: "",
                fullname: "",
                phoneNumber: "",
                isSuperuser: false
            }))
            setIsProfileButtonClicked(false);
            toast.success("Выход выполнен  успешно");
        }
        catch(error) {
            console.log(error)
        }
    }

    const handleSubmit = async () => {
        await logout();
    };

    return (
        <div className={styles.header}>
            <div className={styles.header__wrapper}>
                <Link to='/' className={styles.header__logo}>TRAVEL PASS</Link>

                <div className={styles.header__blocks}>
                    <Link className={styles.header__block} to='/subscriptions'>Виды абонементов</Link>
                    {isUserAuth && <Link className={styles.header__block} to='/applications'>Мои заявки</Link>}
                    <Link className={styles.header__block} to='/'>Поддержка</Link>
                </div>

                <div className={styles.header__icons}>
                    {isUserAuth && 
                        <div className={styles['application__icon-wrapper']}>
                            <Link to={'/application'}>
                                <div className={styles['application__icon-circle']}>{subscriptionsFromApplications.length}</div>
                                <ApplicationIcon/>
                            </Link>
                        </div>
                    }
                    {isUserAuth ? <ProfileIcon className={styles['header__profile-icon']} onClick={handleProfileButtonClick}/> : <Link to='/registration' className={styles.header__profile}><ProfileIcon/></Link>}
                    {isBurgerMenuOpened === false
                        ? <BurgerIcon className={styles.burger__icon} color='accent' onClick={() => setIsBurgerMenuOpened(true)} />
                        : <div className={styles.cancel__icon} onClick={() => setIsBurgerMenuOpened(false)}></div>}
                    {isBurgerMenuOpened &&
                    <div className={styles.burger__menu}>
                        <Link className={styles['burger__menu-item']} to={'/subscriptions'}>Виды абонементов</Link>
                        <Link className={styles['burger__menu-item']} to={`/applications`}>Мои заявки</Link>
                        <Link className={styles['burger__menu-item']} to={`/`}>Поддержка</Link>
                    </div>}
                </div>

                <AnimatePresence>
                {isUserAuth && isProfileButtonClicked && (
                    <motion.div
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -50 }}
                    transition={{ duration: 0.3 }}
                    style={{
                        marginTop: 400,
                        position: "absolute",
                        right: 0,
                    }}
                    >
                    <ProfileWindow
                        email={user.email}
                        fullname={user.fullname}
                        phoneNumber={user.phoneNumber}
                        onClick={handleSubmit}
                    />
                    </motion.div>
                )}
                </AnimatePresence>
            </div>
        </div>
    )
};

export default Header;