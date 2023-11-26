import React, { useState } from 'react'
import axios from 'axios'
import styles from './ApplicationsListPage.module.scss'
import Header from 'components/Header'
import ModalWindow from 'components/ModalWindow'
import ApplicationsTable from 'components/ApplicationsTable'
import { useDispatch } from 'react-redux'
import { setApplicationsAction, useApplications } from 'Slices/ApplicationsSlice'

export type ReceivedApplicationData = {
    id: number;
    status: string;
    creation_date: string;
    publication_date: string;
    approving_date: string;
  }

const ApplicationsListPage = () => {
    const dispatch = useDispatch();
    const applications = useApplications();
    const [isModalWindowOpened, setIsModalWindowOpened] = useState(false);

    const getAllApplications = async () => {
        try {
          const response = await axios('http://localhost:8000/applications', {
            method: 'GET',
            withCredentials: true
          })
          const newArr = response.data.map((raw: ReceivedApplicationData) => ({
            id: raw.id,
            status: raw.status,
            creationDate: raw.creation_date,
            publicationDate: raw.publication_date,
            approvingDate: raw.approving_date,
        }));
        dispatch(setApplicationsAction(newArr))
        } catch(error) {
          throw error
        }
    }

    React.useEffect(() => {
        getAllApplications()
    }, [])
    
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