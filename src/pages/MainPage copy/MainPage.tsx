import * as React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Header from 'components/Header';
import OneCard from 'components/Card';
import './MainPage.scss'
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
    const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
    const [inputValue, setInputValue] = useState<string>('')
    // const [isSearchButtonClicked, setIsSearchButtonClicked] = useState<boolean>(false)
    const fetchSubscriptions = async () => {
        let response = null;
        if (!inputValue) {
            response = await fetch('http://127.0.0.1:8000/subscriptions');
        } else {
            response = await fetch(`http://127.0.0.1:8000/subscriptions?value=${inputValue}`);
        }
        const jsonData = await response.json();
        const newRecipesArr = jsonData.map((raw: ReceivedSubscriptionData) => ({
            title: raw.title,
            price: raw.price,
            info: raw.info,
            src: raw.src,
            categoryTitle: raw.category
        }))
        setSubscriptions(newRecipesArr);
        // fetchCategory(newRecipesArr)
    };
    useEffect(() => {
        fetchSubscriptions();
    }, []);

    const handleSearchButtonClick = () => {
        fetchSubscriptions();
    }

    const handleInputValueChange = (event: ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };

    const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    };

    return (
        <div className='main__page'>
            <Header/>
            <div className='content'>
                <h1 className="mb-4">
                    Здесь вы можете подобрать выбрать для себя подходящий абонемент на какой-либо транспорт
                </h1>

                <Form className="d-flex gap-3" onSubmit={handleFormSubmit}>
                    <Form.Group className='w-100' controlId="search__sub.input__sub">
                        <Form.Control value={inputValue} onChange={handleInputValueChange} type="text" placeholder="Введите вид транспорта..." />
                    </Form.Group>
                    <Button onClick={() => handleSearchButtonClick()} className='bg-primary'>Найти</Button>
                </Form>

                <div className="content__cards pb-5">
                    {subscriptions.map((subscription: Subscription) => (
                        <OneCard src={subscription.src} onButtonClick={() => console.log(111)} title={subscription.title} category={subscription.categoryTitle}></OneCard>
                    ))}
                </div>
            </div>
        </div>
    )
};
  
export default MainPage;