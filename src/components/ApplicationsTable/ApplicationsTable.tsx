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
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

interface ApplicationData {
  id: number;
  status: string;
  creationDate: string;
  publicationDate: string;
  approvingDate: string;
  activeDate: string;
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
  const [isModalWindowOpened, setIsModalWindowOpened] = useState(false);
  const [currentSubscriptions, setCurrentSubscriptions] = useState<SubscriptionData[]>([])
  const navigate = useNavigate()

  const handleClick = (id: number) => {
    navigate(`/applications/${id}`, { state: { flag: true } });
  };

  return (
    <>
    <div className={styles.table__container}>
    <Table hover responsive borderless className={!className ? styles.table : cn(styles.table, className)}>
        <thead>
          <tr className={styles.tableHead}>
            <th>№</th>
            <th>Статус</th>
            <th>Дата создания</th>
            <th>Дата формирования</th>
            <th>Дата завершения</th>
            <th>Начало действия</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {applications.map((application: ApplicationData, index: number) => (
            <tr className={styles.table__row} key={application.id}>
              <td>{++index}</td>
              <td>{application.status}</td>
              <td>{application.creationDate}</td>
              <td>{application.publicationDate ? application.publicationDate : '-'}</td>
              <td>{application.approvingDate ? application.approvingDate : '-'}</td>
              <td>{application.activeDate ? application.activeDate : '-'}</td>
              <td className={styles.table__action}>
                {/* <Link 
                to={{
                  pathname: `/applications/${application.id}`,
                  state: { flag: true }, // Здесь передаем пропс
                }}> */}
                  <Button className={styles.table__button} onClick={() => handleClick(application.id)}>Подробнее</Button>
                {/* </Link>  */}
                {/* <Link to={`/applications/${application.id}`}> */}
                  {/* <Button onClick={() => handleDetailedButtonClick(application.id)}>Подробнее</Button> */}
                {/* </Link> */}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>

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