import * as React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Header from 'components/Header';
import OneCard from 'components/Card';
import './DetaliedPage.scss'
import { useEffect, useState } from 'react';
import { ChangeEvent } from 'react';

export type Subscription = {
    title: string,
    price: string,
    info: string,
    src: string,
    idCategory: number,
    categoryTitle: string
}

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

    return (
        <div className='main__page'>
            <Header/>
            <div className='test' style={{padding: "200px"}}>
                dfklsdjfkldsjkflks;a
            </div>
        </div>
    )
};
  
export default MainPage;