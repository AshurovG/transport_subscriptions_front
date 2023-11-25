import React from 'react'
import axios from 'axios'
import styles from './CurrentApplicationPage.module.scss'
import Header from 'components/Header'
import { useCurrentApplicationId } from 'Slices/ApplicationsSlice'
import SubscriptionsTable from 'components/SubscriptionsTable'
import { mockSubscriptions } from '../../../consts';

const CurrentApplicationPage = () => {
  const currentApplicationId = useCurrentApplicationId()

  const getCurrentApplication = async () => {
    try {
      const response = await axios(`http://localhost:8000/applications/${currentApplicationId}`, {
        method: 'GET',
        withCredentials: true,
        params: {
          status: 'Зарегистрирован'
        }
      })
      console.log("текущая заявка:", response.data)
    } catch {

    }
  }

  React.useEffect(() => {
    getCurrentApplication();
  }, [])

  return (
    <div className={styles.application__page}>
      <Header/>
      <div className={styles['application__page-wrapper']}>
        <h1 className={styles['application__page-title']}>
          Текущая заявка
        </h1>
        <div className={styles['application__page-info']}>
          <h3 className={styles['application__page-info-title']}>Дата создания заявки: <b>2023-01-20</b></h3>
          <SubscriptionsTable subscriptions={mockSubscriptions} className={styles['application__page-info-table']}/>
        </div>
      </div>
    </div>
  )
}

export default CurrentApplicationPage
