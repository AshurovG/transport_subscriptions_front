import React from 'react'
import axios from 'axios';
import { toast } from 'react-toastify';
import styles from './ApplicationsTable.module.scss'
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import cn from 'classnames';
import { useDispatch } from 'react-redux';
import { useCurrentApplicationDate, useSubscripitonsFromApplication,
  setCurrentApplicationDateAction, setSubscriptionsFromApplicationAction, setCurrentApplicationIdAction } from 'Slices/ApplicationsSlice'

interface SubscriptionData {
  id: number,
  title: string,
  price: number,
  info: string,
  src: string,
  categoryTitle: string
}

export type SubscriptionsTableProps = {
  subscriptions: SubscriptionData[];
  className?: string;
};

const SubscriptionsTable: React.FC<SubscriptionsTableProps> = ({subscriptions, className}) => {
  const dispatch = useDispatch();
  const subscripions = useSubscripitonsFromApplication()

  const handleDetailedButtonClick = (id: number) => {
    
  }

  return (
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
          {subscriptions.map((subscription: SubscriptionData, index: number) => (
            <tr key={subscription.id}>
              <td>{++index}</td>
              <td>{subscription.categoryTitle}</td>
              <td>{subscription.title}</td>
              <td>{subscription.price} ₽</td>
              <td className={styles.table__action}><Button onClick={() => console.log('detailed information')}>Подробнее</Button></td>
            </tr>
          ))}
        </tbody>
      </Table>
  )
}

export default SubscriptionsTable