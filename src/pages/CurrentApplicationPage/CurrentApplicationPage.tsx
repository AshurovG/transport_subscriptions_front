import React from 'react'
import axios from 'axios'
import styles from './CurrentApplicationPage.module.scss'
import Header from 'components/Header'
import Button from 'react-bootstrap/Button'
import { useCurrentApplicationId } from 'Slices/ApplicationsSlice'
import SubscriptionsTable from 'components/SubscriptionsTable'
import { mockSubscriptions } from '../../../consts';
import { useDispatch } from 'react-redux'
import { useCurrentApplicationDate, useSubscripitonsFromApplication,
  setCurrentApplicationDateAction, setSubscriptionsFromApplicationAction, setCurrentApplicationIdAction } from 'Slices/ApplicationsSlice'


export type ReceivedSubscriptionData = {
  id: number;
  title: string;
  price: number;
  info: string;
  src: string;
  id_category: number;
  category: string;
}

const CurrentApplicationPage = () => {
  const dispatch = useDispatch();
  const subscriptions = useSubscripitonsFromApplication();
  const applicationDate = useCurrentApplicationDate();
  const currentApplicationId = useCurrentApplicationId()

  return (
    <div className={styles.application__page}>
      <Header/>
      <div className={styles['application__page-wrapper']}>
        <h1 className={styles['application__page-title']}>
          Текущая заявка
        </h1>

        <h5 className={styles['application__page-subtitle']}>
          У вас есть возможность удалять абонементы из заявки, удалить всю заявку или отправить заявку на проверку модераторам!
        </h5>

        <div className={styles['application__page-info']}>
          <h3 className={styles['application__page-info-title']}>Дата создания заявки: <b>{applicationDate}</b></h3>
          <SubscriptionsTable subscriptions={subscriptions} className={styles['application__page-info-table']}/>

          <div className={styles['application__page-info-btns']}>
            <Button className={styles['application__page-info-btn']}>Отправить</Button>
            <Button className={styles['application__page-info-btn']}>Удалить</Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CurrentApplicationPage
