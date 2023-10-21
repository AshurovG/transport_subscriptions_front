import React from 'react';
import { Link } from 'react-router-dom'
import styles from './Header.module.scss'

const Header: React.FC = () => {
    return (
        <div className={styles.header}>
            <div className={styles.header__wrapper}>
                <Link to='/' className={styles.header__logo}>TRAVEL PASS</Link>

                <div className={styles.header__blocks}>
                    <Link className={styles.header__block} to='/'>Виды абонементов</Link>
                    <Link className={styles.header__block} to='/'>Выгодные предложения</Link>
                    <Link className={styles.header__block} to='/'>О нас</Link>
                    <Link className={styles.header__block} to='/'>Поддержка</Link>
                </div>

                <Link to='/' className={styles.header__profile}>Личный кабинет</Link>
            </div>
        </div>
    )
};

export default Header;