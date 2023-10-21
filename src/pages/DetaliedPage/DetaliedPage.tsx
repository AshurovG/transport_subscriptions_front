import * as React from 'react';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Header from 'components/Header';
import Image from "react-bootstrap/Image"
import OneCard from 'components/Card';
import styles from './DetaliedPage.module.scss'
import { useEffect, useState } from 'react';
import { ChangeEvent } from 'react';
import { useParams } from 'react-router-dom';

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
}

const MainPage: React.FC = () => {
    const params = useParams();
    const id = params.id === undefined ? '' : params.id;
    console.log(typeof id)

    const [subscription, setSubscription] = useState<Subscription>();

    const fetchSubscription = async () => {
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
    };
    useEffect(() => {
        fetchSubscription();
    }, []);

    return (
        <div className='main__page'>
            <Header/>
            <div className={styles.content} style={{paddingTop: "120px"}}>
                <div className='d-flex gap-5'>
                    <Image
                        style={{ width: '45%' }}
                        src={subscription?.src ? subscription?.src : "https://www.solaredge.com/us/sites/nam/files/Placeholders/Placeholder-4-3.jpg"}
                        rounded
                    />
                    <div style={{width: '55%'}}>
                        <div className='d-flex align-self-center justify-content-between gap-2'>
                            <h1 className='mb-4'>{subscription?.categoryTitle} "{subscription?.title}"</h1>
                            <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>
                                <Button variant="primary" style={{backgroundColor: "#3D348B", padding: "15px 30px", borderColor: "#000"}}>
                                        Назад
                                </Button>
                            </Link>
                        </div>
                        <h4>Цена на данный абонемент:  <strong>{subscription?.price}</strong></h4>
                        <h4>Описание:
                        <p>{subscription?.info}</p>
                        </h4>
                    </div>
                </div>
            </div>
        </div>
    )
};
  
export default MainPage;