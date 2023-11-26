import React from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import styles from './SelectedApplicationPage.module.scss'
import Header from 'components/Header'
import SubscriptionsTable from 'components/SubscriptionsTable'

export type ReceivedSubscriptionData = {
    id: number;
    title: string;
    price: number;
    info: string;
    src: string;
    id_category: number;
    category: string;
  }

const SelectedApplicationPage = () => {
    const params = useParams();
    const id = params.id === undefined ? '' : params.id;
    const [currentSubsription, setCurrentSubscription] = React.useState([])

    const getCurrentApplication = async () => {
        try {
          const response = await axios(`http://localhost:8000/applications/${id}`, {
            method: 'GET',
            withCredentials: true,
          })

          console.log(response.data)
          const newArr = response.data.subscriptions.map((raw: ReceivedSubscriptionData) => ({
            id: raw.id,
            title: raw.title,
            price: raw.price,
            info: raw.info,
            src: raw.src,
            categoryTitle: raw.category
        }));
        setCurrentSubscription(newArr)
        console.log('newArr is', newArr)
        } catch(error) {
          throw error;
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
                    Добавленные абонементы
                </h1>
                <SubscriptionsTable flag={true} subscriptions={currentSubsription} className={styles['application__page-table']}/>
            </div>
        </div>
    )
}

export default SelectedApplicationPage