import React, { useState } from 'react'
import styles from './AdminSubscriptionsPage.module.scss'
import {useDispatch} from "react-redux";
import {useCategories, useCategoryValue, useTitleValue, useSubscriptions, usePriceValues,
     setCategoryValueAction, setTitleValueAction, setSubscriptionsAction, setPriceValuesAction} from "../../Slices/MainSlice";

import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Header from 'components/Header';
import CustomTable from 'components/CustomTable';
import ModalWindow from 'components/ModalWindow';




export type ReceivedSubscriptionData = {
    id: number;
    title: string;
    price: number;
    info: string;
    src: string;
    id_category: number;
    category: string;
}

const columns = [
    {
        key: 'categoryTitle',
        title: 'Категория'
    },
    {
        key: 'title',
        title: 'Название абонемента'
    },
    {
        key: 'price',
        title: 'Стоимость'
    },
    // {
    //     key: 'info',
    //     title: 'Описание'
    // },
]

const AdminSubscriptionsPage = () => {
    const dispatch = useDispatch()
    const subscriptions = useSubscriptions()
    const categories = useCategories()
    
    React.useEffect(() => {
        console.log(11111)
    }, [])
  return (
    <div className={styles.admin__page}>
        <Header/>

        <div className={styles['admin__page-wrapper']}>
            <h1 className={styles['admin__page-title']}>Список абонементов</h1>

            <div className={styles['admin__page-title']}>
            <CustomTable className={styles['admin__page-table']} data={subscriptions} 
          columns={columns} flag={2} ></CustomTable>
            </div>
        </div>
    </div>
  )
}

export default AdminSubscriptionsPage