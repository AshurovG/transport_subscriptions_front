import React, { useState } from 'react'
import styles from './ApplicationsListPage.module.scss'
import Header from 'components/Header'
import ModalWindow from 'components/ModalWindow'
import ApplicationsTable from 'components/ApplicationsTable'
import { useDispatch } from 'react-redux'
import { useApplications } from 'Slices/ApplicationsSlice'

const ApplicationsListPage = () => {
    const dispatch = useDispatch();
    const applications = useApplications();
    const [isModalWindowOpened, setIsModalWindowOpened] = useState(false);

    // const handleBackdropClick = () => {
    //    console.log('back click !!!')
    // };
    
    return (
        <div className={styles.applications__page}>
            <Header/>
            <div className={styles['applications__page-wrapper']}>
                <h1 className={styles['applications__page-title']}>История ваших заявок</h1>
                <h5 className={styles['applications__page-subtitle']}>
                    На этой странице расположена вся история ваших заявок. Вы можете посмотреть информацию о каждой заявке, а также добавленные в нее абонементы!
                </h5>
                <ApplicationsTable applications={applications}/>
                <ModalWindow handleBackdropClick={() => setIsModalWindowOpened(false)} className={styles.modal} active={isModalWindowOpened}>
                    <h3 className={styles.modal__title}>Регистрация прошла успешно!</h3>
                </ModalWindow>
            </div>
        </div>
    )
}

export default ApplicationsListPage