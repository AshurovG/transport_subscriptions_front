import React from 'react';
import { Link } from 'react-router-dom'
import styles from './Header.module.scss'
import ProfileIcon from 'components/Icons/ProfileIcon';
import ProfileWindow from "components/ProfileWindow";
import { motion, AnimatePresence } from "framer-motion";
import axios, {AxiosResponse} from 'axios';
import {useDispatch} from "react-redux";
import {useUser, useIsProfileButtonclicked, useIsAuth, setIsAuthAction, setUserAction, setIsProfileButtonClickedAction} from "../../Slices/AuthSlice";
import Cookies from "universal-cookie";

const cookies = new Cookies();

const Header: React.FC = () => {
    const dispatch = useDispatch();
    const isUserAuth = useIsAuth();
    let user = useUser();
    const isProfileButtonClicked = useIsProfileButtonclicked();

    const handleProfileButtonClick = () => {
        dispatch(setIsProfileButtonClickedAction(!isProfileButtonClicked));
    };

    const logout = async () => {
        try {
            console.log(cookies.get('session_id'))
            const response: AxiosResponse = await axios('http://localhost:8000/logout',
            {
                method: "POST",
                headers: { 
                    "Content-type": "application/json; charset=UTF-8",
                    Authorization: cookies.get("session_id"),
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
                    <Link className={styles.header__block} to='/'>Виды абонементов</Link>
                    <Link className={styles.header__block} to='/'>Мои заявки</Link>
                    <Link className={styles.header__block} to='/'>Поддержка</Link>
                </div>

                {isUserAuth ? <ProfileIcon onClick={handleProfileButtonClick}/> : <Link to='/registration' className={styles.header__profile}><ProfileIcon/></Link>}

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