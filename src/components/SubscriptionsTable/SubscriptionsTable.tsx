import React from 'react'
import styles from './SubscriptionsTable.module.scss'
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import cn from 'classnames';

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
  return (
      <Table borderless className={!className ? styles.table : cn(styles.table, className)}>
        <thead>
          <tr className={styles.tableHead}>
            <th>№</th>
            <th>Категория</th>
            <th>Название</th>
            <th>Цена</th>
          </tr>
        </thead>
        <tbody>
          {subscriptions.map((subscription: SubscriptionData, index: number) => (
            <tr key={subscription.id}>
              <td>{++index}</td>
              <td>{subscription.categoryTitle}</td>
              <td>{subscription.title}</td>
              <td className={styles.table__action}>{subscription.price} <Button className={styles.table__btn} style={{backgroundColor: '#2787F5'}}>Удалить</Button></td>
            </tr>
          ))}
        </tbody>
      </Table>
  )
}

export default SubscriptionsTable