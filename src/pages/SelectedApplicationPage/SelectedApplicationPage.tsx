import React, { useState, ChangeEvent } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import styles from './SelectedApplicationPage.module.scss'
import Header from 'components/Header'
import SubscriptionsTable from 'components/SubscriptionsTable'
import BreadCrumbs from 'components/BreadCrumbs';
import { useDispatch } from 'react-redux';
import { useLinksMapData, setLinksMapDataAction } from 'Slices/DetailedSlice';
import { useLocation } from 'react-router-dom';
import { useCurrentApplicationDate, useSubscripitonsFromApplication,
  setCurrentApplicationDateAction, setSubscriptionsFromApplicationAction } from 'Slices/ApplicationsSlice'
import { Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { Form } from "react-bootstrap";

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
  const location = useLocation();
  const flag = location.state?.flag;
  const applicationDate = useCurrentApplicationDate();
  const navigate = useNavigate()
  const subscripitonsFromApplication = useSubscripitonsFromApplication()
  const today = new Date().toISOString().split('T')[0];
  const [dateValue, setDateValue] = useState('')
  
  React.useEffect(() => {
    console.log('flag', flag)
  }, [])

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

  const sendApplication = async () => {
    try {
      await axios(`http://localhost:8000/applications/send`, {
        method: 'PUT',
        data: {
          active_date: dateValue
        },
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

  React.useEffect(() => {
      const newLinksMap = new Map<string, string>(linksMap); // Копирование старого Map
      newLinksMap.set('Текущая заявка', '/applications/' + id);
      dispatch(setLinksMapDataAction(newLinksMap))
      getCurrentApplication();

  }, [])

  const handleSendButtonClick = () => {
    sendApplication();
    navigate('/subscriptions')
  }

  const handleDeleteButtonClick = () => {
    deleteApplication();
    navigate('/subscriptions')
  }

  const handleDateChange = (event: ChangeEvent<HTMLInputElement>) => {
    setDateValue(event.target.value);
    console.log(event.target.value)
  };

    return (
        <div className={styles.application__page}>
            <Header/>
            <div className={styles['application__page-wrapper']}>
                <BreadCrumbs links={linksMap}></BreadCrumbs>
                {flag ? <h1 className={styles['application__page-title']}>
                    Добавленные абонементы
                </h1>
                : <>
                <h1 className={styles['application__page-title']}>
                  Текущая заявка
                </h1>
                <h5 className={styles['application__page-subtitle']}>
                  У вас есть возможность удалять абонементы из заявки, удалить всю заявку или отправить заявку на проверку модераторам!
                </h5>
                </>
                }
                <div>
                  {!flag ? <>
                    <h3 className={styles['application__page-info-title']}>Дата создания заявки: <br/><b>{applicationDate}</b></h3>
                    {/* <h3 className={styles['application__page-text']}>Добавленные абонементы:</h3> */}

                  <SubscriptionsTable flag={false} subscriptions={subscripitonsFromApplication} className={styles['application__page-table']}/>
                  <h3 className={styles['application__page-text']} style={{marginTop: 30}}>Дата начала действия абонемента:</h3>
                  <div className={styles['application__page-info-btns']}>
                  <Form.Control
                    className={styles['application__page-input']}
                    type="date"
                    defaultValue={today}
                    min={today}
                    onChange={handleDateChange}
                  />
                    <Button onClick={() => handleSendButtonClick()} className={styles['application__page-info-btn']}>Отправить</Button>
                    <Button onClick={() => handleDeleteButtonClick()} className={styles['application__page-info-btn']}>Удалить</Button>
                  </div>
                  </>
                  : <SubscriptionsTable flag={true} subscriptions={currentSubsription} className={styles['application__page-table']}/>
                  }
                </div>
            </div>
        </div>
    )
}

export default SelectedApplicationPage