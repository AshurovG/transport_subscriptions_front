import React from 'react'
import axios from 'axios'
import { toast } from 'react-toastify';
import styles from './CurrentApplicationPage.module.scss'
import Header from 'components/Header'
import Button from 'react-bootstrap/Button'
import { useCurrentApplicationId } from 'Slices/ApplicationsSlice'
import SubscriptionsTable from 'components/SubscriptionsTable'
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
  const currentApplicationId = useCurrentApplicationId();

  const sendApplication = async () => {
    try {
      const response = await axios(`http://localhost:8000/applications/send`, {
        method: 'PUT',
        withCredentials: true
      })

      dispatch(setSubscriptionsFromApplicationAction([]));
      dispatch(setCurrentApplicationDateAction(''));
      toast.success("Заявка успешно отправлена на проверку!");
    } catch(error) {
      throw error;
    }
  }

  const deleteApplication = async () => {
    try {
      const response = await axios(`http://localhost:8000/applications/delete`, {
      method: 'DELETE',
      withCredentials: true
    })

    dispatch(setSubscriptionsFromApplicationAction([]));
    dispatch(setCurrentApplicationDateAction(''));
    toast.success("Заявка успешно удалена!");
    }
    catch(error) {
      throw error;
    }
    
  }

  const handleSendButtonClick = () => {
    sendApplication();
  }

  const handleDeleteButtonClick = () => {
    deleteApplication();
  }

  return (
    <div className={styles.application__page}>
      <Header/>
      <div className={styles['application__page-wrapper']}>
        <h1 className={styles['application__page-title']}>
          Текущая заявка
        </h1>

        {subscriptions.length !== 0 ? <div>
          <h5 className={styles['application__page-subtitle']}>
            У вас есть возможность удалять абонементы из заявки, удалить всю заявку или отправить заявку на проверку модераторам!
          </h5>

          <div className={styles['application__page-info']}>
            <h3 className={styles['application__page-info-title']}>Дата создания заявки: <b>{applicationDate}</b></h3>
            <SubscriptionsTable subscriptions={subscriptions} className={styles['application__page-info-table']}/>

            <div className={styles['application__page-info-btns']}>
              <Button onClick={() => handleSendButtonClick()} className={styles['application__page-info-btn']}>Отправить</Button>
              <Button onClick={() => handleDeleteButtonClick()} className={styles['application__page-info-btn']}>Удалить</Button>
            </div>
          </div>
        </div>
        : <h5 className={styles['application__page-subtitle']}>
            На данный момент ваша заявка пустая! Вы можете добавить различные абонементы в заявку, и отправить ее на поверку модераторам!
          </h5>
      }
      </div>
    </div>
  )
}

export default CurrentApplicationPage
