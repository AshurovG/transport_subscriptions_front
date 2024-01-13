import React from 'react'
import axios from 'axios';
import { toast } from 'react-toastify';
import styles from './SubscriptionsTable.module.scss'
import Table from 'react-bootstrap/Table';
import cn from 'classnames';
import { useDispatch } from 'react-redux';
import BasketIcon from 'components/Icons/BasketIcon';
import { useNavigate } from 'react-router-dom';
import { useCurrentApplicationDate, useSubscripitonsFromApplication,
  setCurrentApplicationDateAction, setSubscriptionsFromApplicationAction, setCurrentApplicationIdAction } from 'Slices/ApplicationsSlice'

interface SubscriptionData {
  id: number,
  title: string,
  price: number,
  info: string,
  src: string,
  categoryTitle: string,
}

export type SubscriptionsTableProps = {
  subscriptions: SubscriptionData[];
  className?: string;
  flag?: boolean;
};

const SubscriptionsTable: React.FC<SubscriptionsTableProps> = ({subscriptions, className, flag}) => {
  const dispatch = useDispatch();
  const subscripions = useSubscripitonsFromApplication()
  const navigate = useNavigate()

  const deleteSubscriptionFromApplication = async (id: number) => {
    try {
      const response = axios(`http://localhost:8000/application_subscription/${id}/delete`, {
        method: 'DELETE',
        withCredentials: true
      })

      console.log(id, subscripions)

      dispatch(setSubscriptionsFromApplicationAction(subscripions.filter(subscription => subscription.id !== id)))

      toast.success("Абонемент успешно удален!");
    } catch(error) {
      throw error;
    }
  }

  const handleDeleteButtonClick = (id: number) => {
    deleteSubscriptionFromApplication(id)
    if (subscripions.length === 1) {
      navigate('/subscriptions')
    }
  }

  return (
    <div className={styles.table__container}>
      <Table hover responsive borderless className={!className ? styles.table : cn(styles.table, className)}>
        <thead>
          <tr className={styles.tableHead}>
            <th>№</th>
            <th>Категория</th>
            <th>Название</th>
            <th>Цена</th>
            {!flag && <th></th>}
          </tr>
        </thead>
        <tbody>
          {subscriptions.map((subscription: SubscriptionData, index: number) => (
            <tr key={subscription.id}>
              <td>{++index}</td>
              <td>{subscription.categoryTitle}</td>
              <td>{subscription.title}</td>
              <td>{subscription.price} ₽</td>
              {!flag && <td className={styles.table__action}><BasketIcon onClick={() => handleDeleteButtonClick(subscription.id)}/></td>}
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  )
}

export default SubscriptionsTable