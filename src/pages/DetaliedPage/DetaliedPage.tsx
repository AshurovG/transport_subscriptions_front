import * as React from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Header from 'components/Header';
import BreadCrumbs from 'components/BreadCrumbs';
import Image from "react-bootstrap/Image"
import styles from './DetaliedPage.module.scss'
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { mockSubscriptions } from '../../../consts'

type Subscription = {
    id: number;
    title: string;
    price: number;
    info: string;
    src: string;
    categoryTitle: string;
};

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


const MainPage: React.FC = () => {
    const params = useParams();
    const id = params.id === undefined ? '' : params.id;
    const [linksMap, setLinksMap] = useState<Map<string, string>>(
        new Map<string, string>([['Абонементы', '/']])
    );

    const [subscription, setSubscription] = useState<Subscription>();
    // const linksMap = new Map<string, string>([
    //     ['Абонементы', '/']
    // ]);
    let currentUrl = '/'

    const fetchSubscription = async () => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/subscriptions/${id}`);
            const jsonData = await response.json();
            setSubscription({
                id: Number(jsonData.id),
                title: jsonData.title,
                price: jsonData.price,
                info: jsonData.info,
                src: jsonData.src,
                categoryTitle: jsonData.category
            })

            const newLinksMap = new Map<string, string>(linksMap); // Копирование старого Map
            newLinksMap.set(jsonData.title, '/subscription/' + id);
            setLinksMap(newLinksMap)
        } catch {
            const subscription = mockSubscriptions.find(item => item.id === Number(id));
            setSubscription(subscription)
        }
        
        currentUrl += 'subscription/' + id
        // if (subscription !== undefined) {
            
        // }
    };
    useEffect(() => {
        fetchSubscription();
        // console.log(currentUrl)
    }, []);

    return (
        <div className='main__page'>
            <Header/>
            <div className={styles.content} style={{paddingTop: "90px"}}>
                <BreadCrumbs links={linksMap}/>
                <div className='d-flex gap-5'>
                    <Image
                        style={{ width: '45%' }}
                        src={subscription?.src ? subscription?.src : "https://www.solaredge.com/us/sites/nam/files/Placeholders/Placeholder-4-3.jpg"}
                        rounded
                    />
                    <div style={{width: '55%'}}>
                            <h1 className='mb-4' style={{fontSize: 30}}>{subscription?.categoryTitle} "{subscription?.title}"</h1>
                        <h4>Цена на данный абонемент:  <strong>{subscription?.price}р.</strong></h4>
                        <div className={styles.content__description}>
                            <h4>Описание:</h4>
                            <p>{subscription?.info}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};
  
export default MainPage;