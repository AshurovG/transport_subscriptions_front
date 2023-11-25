import React from 'react'
import styles from './ApplicationsListPage.module.scss'
import Header from 'components/Header'

const ApplicationsListPage = () => {
  return (
    <div className={styles.applications__page}>
        <Header/>
        <div className={styles['applications__page-wrapper']}>
            <h1 className={styles['applications__page-title']}>История ваших заявок</h1>
        </div>
    </div>
  )
}

export default ApplicationsListPage