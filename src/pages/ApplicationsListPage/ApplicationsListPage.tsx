import React from 'react'
import styles from './ApplicationsListPage.module.scss'
import Header from 'components/Header'
import ApplicationsTable from 'components/ApplicationsTable'
import { useDispatch } from 'react-redux'
import { useApplications } from 'Slices/ApplicationsSlice'

const ApplicationsListPage = () => {
    const dispatch = useDispatch();
    const applications = useApplications();
    
    return (
        <div className={styles.applications__page}>
            <Header/>
            <div className={styles['applications__page-wrapper']}>
                <h1 className={styles['applications__page-title']}>История ваших заявок</h1>
                <h5 className={styles['applications__page-subtitle']}>
                    На этой странице расположена вся история ваших заявок. Вы можете посмотреть информацию о каждой заявке, а также добавленные в нее абонементы!
                </h5>
                <ApplicationsTable applications={applications}/>
            </div>
        </div>
    )
}

export default ApplicationsListPage