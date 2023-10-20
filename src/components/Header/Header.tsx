import React from 'react';
import { Link } from 'react-router-dom'
import styles from './Header.module.scss'

const Header: React.FC = () => {
    const blockNames: Array<string> = ['Виды абонементов', 'Выгодные предложения', 'О нас', 'Поддержка']
    return (
        <div className={styles.header}>
            <div className={styles.header__wrapper}>
                <h4 className={styles.header__logo}>TRAVEL PASS</h4>

                <div className={styles.header__blocks}>
                    <Link className={styles.header__block} to='/'>Виды абонементов</Link>
                    <Link className={styles.header__block} to='/'>Выгодные предложения</Link>
                    <Link className={styles.header__block} to='/'>О нас</Link>
                    <Link className={styles.header__block} to='/'>Поддержка</Link>
                </div>

                <h4 className={styles.header__profile}>Личный кабинет</h4>
            </div>
        </div>
    )
};

export default Header;