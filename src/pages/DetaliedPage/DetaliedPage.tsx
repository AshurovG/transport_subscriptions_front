import * as React from 'react';
// import Button from 'react-bootstrap/Button';
import Header from 'components/Header';
import BreadCrumbs from 'components/BreadCrumbs';
import Image from "react-bootstrap/Image"
import styles from './DetaliedPage.module.scss'
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { mockSubscriptions } from '../../../consts'
import {useDispatch} from "react-redux";
import { useSubscription, useLinksMapData, setSubscriptionAction, setLinksMapDataAction } from "../../Slices/DetailedSlice"
import axios from 'axios';

export type ReceivedSubscriptionData = {
    id: number,
    title: string,
    price: string,
    info: string,
    src: string,
    id_category: number,
    category: string,
    status: string
}


const DetailedPage: React.FC = () => {
    const dispatch = useDispatch();
    const subscription = useSubscription();
    const linksMap = useLinksMapData();

    const params = useParams();
    const id = params.id === undefined ? '' : params.id;

    const getSubscription = async () => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/subscriptions/${id}`);
            const jsonData = response.data;
            dispatch(setSubscriptionAction({
                id: Number(jsonData.id),
                title: jsonData.title,
                price: jsonData.price,
                info: jsonData.info,
                src: jsonData.src,
                categoryTitle: jsonData.category
            }))

            const newLinksMap = new Map<string, string>(linksMap); // Копирование старого Map
            newLinksMap.set(jsonData.title, '/subscriptions/' + id);
            dispatch(setLinksMapDataAction(newLinksMap))
        } catch {
            const sub = mockSubscriptions.find(item => item.id === Number(id));
            if (sub) {
                dispatch(setSubscriptionAction(sub))
            }
        }
    };
    useEffect(() => {
        getSubscription();

        return () => { // Возможно лучше обобщить для всех страниц в отдельный Slice !!!
            dispatch(setLinksMapDataAction(new Map<string, string>([['Абонементы', '/subscriptions']])))
        }
    }, []);

    return (
        <div className='detailed__page'>
            <Header/>
            <div className={styles['detailed__page-wrapper']} style={{paddingTop: "90px"}}>
                <BreadCrumbs links={linksMap}/>
                <div className={styles['detailed__page-container']}>
                    <Image
                        className={styles['detailed__page-image']}
                        src={subscription?.src ? subscription?.src : "https://www.solaredge.com/us/sites/nam/files/Placeholders/Placeholder-4-3.jpg"}
                        rounded
                    />
                    <div className={styles['detailed__page-info']}>
                            <h1 className={styles['detailed__page-title']}>{subscription?.categoryTitle} "{subscription?.title}"</h1>
                        <h4 className={styles['detailed__page-article']}>Цена на данный абонемент:  <strong>{subscription?.price}р.</strong></h4>
                        <div className={styles['detailed__page-description']}>
                            <h4 className={styles['detailed__page-article']}>Описание:</h4>
                            <p>{subscription?.info}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};
  
export default DetailedPage;