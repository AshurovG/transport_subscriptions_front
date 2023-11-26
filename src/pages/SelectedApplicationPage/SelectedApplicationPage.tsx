import React from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import styles from './SelectedApplicationPage.module.scss'
import Header from 'components/Header'
import SubscriptionsTable from 'components/SubscriptionsTable'
import BreadCrumbs from 'components/BreadCrumbs';
import { useDispatch } from 'react-redux';
import { useLinksMapData, setLinksMapDataAction } from 'Slices/DetailedSlice';

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
    const dispatch = useDispatch();
    const linksMap = useLinksMapData();

    const getCurrentApplication = async () => {
        try {
          const response = await axios(`http://localhost:8000/applications/${id}`, {
            method: 'GET',
            withCredentials: true,
          })

          const newArr = response.data.subscriptions.map((raw: ReceivedSubscriptionData) => ({
            id: raw.id,
            title: raw.title,
            price: raw.price,
            info: raw.info,
            src: raw.src,
            categoryTitle: raw.category
        }));
        setCurrentSubscription(newArr)
        } catch(error) {
          throw error;
        }
      }

    React.useEffect(() => {
        const newLinksMap = new Map<string, string>(linksMap); // Копирование старого Map
        newLinksMap.set(id, '/applications/' + id);
        dispatch(setLinksMapDataAction(newLinksMap))
        getCurrentApplication();

    }, [])

    return (
        <div className={styles.application__page}>
            <Header/>
            <div className={styles['application__page-wrapper']}>
                <BreadCrumbs links={linksMap}></BreadCrumbs>
                <h1 className={styles['application__page-title']}>
                    Добавленные абонементы
                </h1>
                <SubscriptionsTable flag={true} subscriptions={currentSubsription} className={styles['application__page-table']}/>
            </div>
        </div>
    )
}

export default SelectedApplicationPage