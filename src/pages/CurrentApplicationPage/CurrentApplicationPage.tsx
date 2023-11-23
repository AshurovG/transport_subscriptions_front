import React from 'react'
import axios from 'axios'
import styles from './CurrentApplicationPage.module.scss'
import Header from 'components/Header'
import { useCurrentApplicationId } from 'Slices/ApplicationsSlice'

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
          Ваша текущая заявка
        </h1>
      </div>
    </div>
  )
}

export default CurrentApplicationPage
