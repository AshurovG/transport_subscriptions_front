import React, {ChangeEvent, useState} from 'react'
import axios from 'axios'
import styles from './AdminApplicationsPage.module.scss'
import Header from 'components/Header'
import { useDispatch } from 'react-redux'
import { useApplications, setApplicationsAction } from 'Slices/ApplicationsSlice'
import { useLinksMapData, setLinksMapDataAction } from 'Slices/DetailedSlice'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import BreadCrumbs from 'components/BreadCrumbs'
import { Dropdown } from 'react-bootstrap'
import ArrowDownIcon from 'components/Icons/ArrowDownIcon'
import AdminApplicationsTable from 'components/AdminApplicationsTable'

const statuses = ["Все", "Проверяется",'Отказано', "Принято"]

export type ReceivedApplicationData = {
  id: number;
  status: string;
  creation_date: string;
  publication_date: string;
  approving_date: string;
  active_date: string;
  user: string
}

export type ApplicationData = {
  id: number;
  status: string;
  creationDate: string;
  publicationDate: string;
  approvingDate: string;
  activeDate: string;
  userEmail: string;
}

const AdminApplicationsPage = () => {
  const applications = useApplications()
  const linksMap = useLinksMapData()
  const dispatch = useDispatch()
  const [startTime, setStartTime] = useState('')
  const [endTime, setEndTime] = useState('')
  const [statusValue, setStatusValue] = useState(statuses[0])
  const [emailValue, setEmailValue] = useState('')

  const getAllApplications = async () => {
    let res = ''
    if (startTime && endTime) {
      res += `?start=${startTime}&end=${endTime}`
    } else if(startTime) {
      res += `?start=${startTime}`
    } else if(endTime) {
      res += `?end=${endTime}`
    }

    if (res.length === 0 && statusValue !== 'Все' && statusValue ) {
      res += `?status=${statusValue}`
    } else if (res.length !== 0 && statusValue !== 'Все'){
      res += `&status=${statusValue}`
    }

    try {
      const response = await axios(`http://localhost:8000/applications${res}`, {
      method: 'GET',
      withCredentials: true,
    })
      
    const newArr = response.data.map((raw: ReceivedApplicationData) => ({
      id: raw.id,
      status: raw.status,
      creationDate: raw.creation_date,
      publicationDate: raw.publication_date,
      approvingDate: raw.approving_date,
      activeDate: raw.active_date,
      userEmail: raw.user
    }));
    dispatch(setApplicationsAction(newArr.filter((application: ApplicationData) => {
      return application.userEmail ? application.userEmail.includes(emailValue) : false;
    })));

    } catch(error) {
      throw error
    }
  }

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    getAllApplications()
  }

  const handleCategorySelect = (eventKey: string | null) => {
    if (eventKey !== null) {
      const selectedStatus = statuses.find(status => status === eventKey)
      if (selectedStatus && selectedStatus !== statusValue && selectedStatus) {
        setStatusValue(selectedStatus)
        console.log('status value is', selectedStatus)
      }
    }
  };

  React.useEffect(() => {
    dispatch(setLinksMapDataAction(new Map<string, string>([
        ['Заявки', '/applications']
    ])))
  }, [])

  React.useEffect(() => {
    getAllApplications()
    const intervalId = setInterval(() => getAllApplications(), 1000);
 
    return () => {
      clearInterval(intervalId);
    };
  }, [statusValue, startTime, endTime, emailValue]);

  React.useEffect(() => {
    dispatch(setApplicationsAction(applications.filter((application: ApplicationData) => {
      return application.userEmail ? application.userEmail.includes(emailValue) : false;
    })));
  }, [emailValue])

  React.useEffect(() => {
    
  }, [])


  return (
    <div className={styles.admin__page}>
      <Header></Header>
        <div className={styles['admin__page-wrapper']}>
        <BreadCrumbs links={linksMap}></BreadCrumbs>
          <h1 className={styles['admin__page-title']}>Заявки всех пользователей</h1>
          <Form onSubmit={(event: React.FormEvent<HTMLFormElement>) => handleFormSubmit(event)}
          className={styles['form']}>
              <div className={styles.form__item}>
              Начальная дата
              <Form.Control 
              onChange={(event: ChangeEvent<HTMLInputElement>) => {
                setStartTime(event.target.value);
              }} 
              value={startTime} 
              className={styles.form__input} 
              type="date" 
              placeholder="Начальная дата*" 
              />
              </div>
              <div className={styles.form__item}>
              Конечная дата
              <Form.Control 
              onChange={(event: ChangeEvent<HTMLInputElement>) => {
                setEndTime(event.target.value);
              }} 
              value={endTime} 
              className={styles.form__input} 
              type="date" 
              placeholder="Конечная дата (Год-Месяц-День)*" 
              />
              </div>

              <div className={styles.form__item}>
              <Dropdown className={styles['dropdown']} onSelect={handleCategorySelect}>
                <Dropdown.Toggle
                    className={styles['dropdown__toggle']}
                    style={{
                        borderColor: '#2787F5',
                        backgroundColor: "#fff",
                        color: '#000',
                    }}
                >   
                    {statusValue}
                    <ArrowDownIcon className={styles.dropdown__icon}/>
                </Dropdown.Toggle>
                <Dropdown.Menu className={styles['dropdown__menu']}>
                    {statuses
                    .map(status => (
                        <Dropdown.Item className={styles['dropdown__menu-item']} key={status} eventKey={status}>
                        {status}
                        </Dropdown.Item>
                    ))}
                    </Dropdown.Menu>
                </Dropdown>
              </div>
              <div className={styles.form__item}>
              <Form.Control 
              onChange={(event: ChangeEvent<HTMLInputElement>) => {
                setEmailValue(event.target.value);
              }} 
              value={emailValue} 
              className={styles.form__input} 
              type="text" 
              placeholder="E-mail *" 
              />
              </div>
              {/* <Button className={styles.form__btn} type='submit'>Найти</Button> */}
          </Form>
          <AdminApplicationsTable></AdminApplicationsTable>
        </div>
    </div>
  )
}

export default AdminApplicationsPage