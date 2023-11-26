import React from 'react'
import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import styles from './ApplicationsTable.module.scss'
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import ModalWindow from 'components/ModalWindow'
import cn from 'classnames';
import { useDispatch } from 'react-redux';
import { useCurrentApplicationDate, useSubscripitonsFromApplication,
  setCurrentApplicationDateAction, setSubscriptionsFromApplicationAction, setCurrentApplicationIdAction } from 'Slices/ApplicationsSlice'

interface ApplicationData {
  id: number;
  status: string;
  creationDate: string;
  publicationDate: string;
  approvingDate: string;
}

interface SubscriptionData {
  id: number;
  title: string;
  price: number;
  info: string;
  src: string;
  categoryTitle: string;
}

export type ReceivedSubscriptionData = {
  id: number;
  title: string;
  price: number;
  info: string;
  src: string;
  id_category: number;
  category: string;
}

export type SubscriptionsTableProps = {
  applications: ApplicationData[];
  className?: string;
};

const ApplicationsTable: React.FC<SubscriptionsTableProps> = ({applications, className}) => {
  const dispatch = useDispatch();
  // const subscripions = useSubscripitonsFromApplication()
  const [isModalWindowOpened, setIsModalWindowOpened] = useState(false);
  const [currentSubscriptions, setCurrentSubscriptions] = useState<SubscriptionData[]>([])

  const getCurrentApplication = async (id: number) => {
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
    setCurrentSubscriptions(newArr)
    console.log('newArr is', newArr)
    } catch(error) {
      throw error;
    }
  }

  const handleDetailedButtonClick = (id: number) => {
    getCurrentApplication(id);
    setIsModalWindowOpened(true)
  };

  return (
    <>
      <Table responsive borderless className={!className ? styles.table : cn(styles.table, className)}>
        <thead>
          <tr className={styles.tableHead}>
            <th>№</th>
            <th>Статус</th>
            <th>Дата создания</th>
            <th>Дата формирования</th>
            <th>Дата завершения</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {applications.map((application: ApplicationData, index: number) => (
            <tr key={application.id}>
              <td>{++index}</td>
              <td>{application.status}</td>
              <td>{application.creationDate}</td>
              <td>{application.publicationDate ? application.publicationDate : '-'}</td>
              <td>{application.approvingDate ? application.approvingDate : '-'}</td>
              <td className={styles.table__action}><Button onClick={() => handleDetailedButtonClick(application.id)}>Подробнее</Button></td>
            </tr>
          ))}
        </tbody>
      </Table>

      <ModalWindow handleBackdropClick={() => setIsModalWindowOpened(false)} className={styles.modal} active={isModalWindowOpened}>
      <h3 className={styles.modal__title}>Добавленные абонементы</h3>
      <div className={styles.modal__list}>
        {currentSubscriptions.map((subscription: SubscriptionData, index: number) => (
          <div className={styles['modal__list-item']}>
            <div className={styles['modal__list-item-title']}>
              {subscription.categoryTitle} "{subscription.title}"
            </div>
            <b>{subscription.price} ₽</b>
          </div>
        ))}
      </div>
      </ModalWindow>
    </>
  );
}

export default ApplicationsTable