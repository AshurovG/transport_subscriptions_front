import React from 'react'
import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import styles from './AdminApplicationsTable.module.scss'
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import ModalWindow from 'components/ModalWindow'
import cn from 'classnames';
import { useDispatch } from 'react-redux';
import { useCurrentApplicationDate, useSubscripitonsFromApplication,
  setCurrentApplicationDateAction, setSubscriptionsFromApplicationAction, setCurrentApplicationIdAction, useApplications, setApplicationsAction } from 'Slices/ApplicationsSlice'
import { Link } from 'react-router-dom';
import CancelIcon from 'components/Icons/CancelIcon';
import AcceptIcon from 'components/Icons/AcceptIcon';



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
  className?: string;
};

export type ReceivedApplicationData = {
  id: number;
  status: string;
  creation_date: string;
  publication_date: string;
  approving_date: string;
}

const AdminApplicationsTable: React.FC<SubscriptionsTableProps> = ({className}) => {
  const dispatch = useDispatch();
  const applications = useApplications()
  const [isModalWindowOpened, setIsModalWindowOpened] = useState(false);
  const [currentSubscriptions, setCurrentSubscriptions] = useState<SubscriptionData[]>([])

  const getAllApplications = async () => {
    try {
      const response = await axios('http://localhost:8000/applications', {
        method: 'GET',
        withCredentials: true
      })
      const newArr = response.data.map((raw: ReceivedApplicationData) => ({
        id: raw.id,
        status: raw.status,
        creationDate: raw.creation_date,
        publicationDate: raw.publication_date,
        approvingDate: raw.approving_date,
      }));
      dispatch(setApplicationsAction(newArr))
    } catch(error) {
      throw error
    }
   }
   
   setInterval(getAllApplications, 5000);

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

  const putApplication = async (id: number, isAccepted: boolean) => {
    try {
      if (isAccepted) {
        await axios(`http://localhost:8000/applications/${id}/adminput`, {
          method: 'PUT',
          data: {
            status: "Принято"
          },
          withCredentials: true
        })
        toast.success('Заявка успешно принята!')
      } else {
        await axios(`http://localhost:8000/applications/${id}/adminput`, {
          method: 'PUT',
          data: {
            status: "Отказано"
          },
          withCredentials: true
        })
        toast.success('Заявка успешно отклонена!')
      }

      const updatedApplications = applications.map(application => {
        if (application.id === id) {
          return {
            ...application,
            status: isAccepted ? 'Принято' : 'Отказано'
          };
        }
        return application;
      });
      getAllApplications()

      dispatch(setApplicationsAction(updatedApplications))
    } catch(e) {
      throw e
    }
  }
  

  const handleDetailedButtonClick = (id: number) => {
    getCurrentApplication(id)
    setIsModalWindowOpened(true)
  };

  const handleAcceptButtonClick = (id: number) => {
    putApplication(id, true)
  }

  const handleCancelButtonClick = (id: number) => {
    putApplication(id, false)
  }

  React.useEffect(() => {
    getAllApplications()
  }, [])

  return (
    <>
    <div className={styles.table__container}>
    <Table responsive borderless className={!className ? styles.table : cn(styles.table, className)}>
        <thead>
          <tr className={styles.tableHead}>
            <th>№</th>
            <th>Статус</th>
            <th>Дата создания</th>
            <th>Дата формирования</th>
            <th>Дата завершения</th>
            <th>Действие</th>
          </tr>
        </thead>
        <tbody>
          {applications.map((application: ApplicationData, index: number) => (
            
            <tr key={application.id}>
              {application.status !== 'Зарегистрирован' && <>
              <td>{++index}</td>
              <td>{application.status}</td>
              <td>{application.creationDate}</td>
              <td>{application.publicationDate ? application.publicationDate : '-'}</td>
              <td>{application.approvingDate ? application.approvingDate : '-'}</td>
              <td className={styles.table__action}>
                <Link to={`/applications/${application.id}`}>
                  <Button>Подробнее</Button>
                </Link>
                {/* <Link to={`/applications/${application.id}`}> */}
                  {/* <Button onClick={() => handleDetailedButtonClick(application.id)}>Подробнее</Button> */}
                  {application.status === 'Проверяется' && <><CancelIcon onClick={() => handleCancelButtonClick(application.id)}></CancelIcon>
                  <AcceptIcon onClick={() => handleAcceptButtonClick(application.id)}></AcceptIcon></>}
                {/* </Link> */}
              </td>
              </>}
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

export default AdminApplicationsTable