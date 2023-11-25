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

interface ApplicationData {
  id: number;
  status: string;
  creationDate: string;
  publicationDate: string;
  approvingDate: string;
}

export type SubscriptionsTableProps = {
  applications: ApplicationData[];
  className?: string;
};

const SubscriptionsTable: React.FC<SubscriptionsTableProps> = ({applications, className}) => {
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
          {applications.map((applications: ApplicationData, index: number) => (
            <tr key={applications.id}>
              <td>{++index}</td>
              <td>{applications.status}</td>
              <td>{applications.creationDate}</td>
              <td>{applications.publicationDate ? applications.publicationDate : '-'}</td>
              <td>{applications.approvingDate ? applications.approvingDate : '-'}</td>
              <td className={styles.table__action}><Button onClick={() => console.log('detailed information')}>Подробнее</Button></td>
            </tr>
          ))}
        </tbody>
      </Table>
  )
}

export default SubscriptionsTable