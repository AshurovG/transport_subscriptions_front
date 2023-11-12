import * as React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Header from 'components/Header';
import OneCard from 'components/Card';
import styles from './MainPage.module.scss'
import { useEffect, useState } from 'react';
import { ChangeEvent } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import { Link } from 'react-router-dom';

import { categories, mockSubscriptions } from '../../../consts';

export type Subscription = {
    id: number,
    title: string,
    price: number,
    info: string,
    src: string,
    idCategory: number,
    categoryTitle: string,
    status: string
}

export type ReceivedSubscriptionData = {
    id: number,
    title: string,
    price: number,
    info: string,
    src: string,
    id_category: number,
    category: string,
}



const MainPage: React.FC = () => {
    const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
    const [categoryValue, setCategoryValue] = useState<string>(categories[0].value)
    const [titleValue, setTitleValue] = useState<string>('')
    const [priceValue, setPriceValue] = useState<number>()
    const fetchSubscriptions = async () => {
        let response = null;
        let url = 'http://127.0.0.1:8000/subscriptions'
        if (titleValue) {
            url += `?title=${titleValue}`
            console.log(url)
            if (categoryValue && categoryValue !== 'Все категории') {
                url += `&category=${categoryValue}`
            }
            if (priceValue) {
                url += `&max_price=${priceValue}`
            }
        } else if(categoryValue && categoryValue !== 'Все категории') {
            url += `?category=${categoryValue}`
            if (priceValue) {
                url += `&max_price=${priceValue}`
            }
        } else if (priceValue){
            url += `?max_price=${priceValue}`
        }
        try {
            response = await fetch(url);
            const jsonData = await response.json();
            console.log(jsonData)
            const newRecipesArr = jsonData.subscriptions.map((raw: ReceivedSubscriptionData) => ({ // Здесь была проблема с undefined на маке
                id: raw.id,
                title: raw.title,
                price: raw.price,
                info: raw.info,
                src: raw.src,
                categoryTitle: raw.category
            }))

            console.log(newRecipesArr)
            setSubscriptions(newRecipesArr);
        }
        catch {
            console.log('запрос не прошел !')
            if (categoryValue && categoryValue !== 'Все категории') {
                const filteredArray = mockSubscriptions.filter(mockSubscription => mockSubscription.categoryTitle === categoryValue);
                setSubscriptions(filteredArray);
            } else if (titleValue) {
                const filteredArray = mockSubscriptions.filter(mockSubscription => mockSubscription.title.includes(titleValue));
                setSubscriptions(filteredArray);
            } else if (priceValue) {
                const filteredArray = mockSubscriptions.filter(mockSubscription => mockSubscription.price <= priceValue);
                setSubscriptions(filteredArray);
            }
            
            else {
                setSubscriptions(mockSubscriptions);
            }
        }
        
    };
    useEffect(() => {
        fetchSubscriptions();
    }, []);

    const handleSearchButtonClick = () => {
        fetchSubscriptions();
    }

    const handleTitleValueChange = (event: ChangeEvent<HTMLInputElement>) => {
        setTitleValue(event.target.value);
    };

    const handlePriceValueChange = (event: ChangeEvent<HTMLInputElement>) => {
        setPriceValue(Number(event.target.value));
    };

    const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    };

    const handleCategorySelect = (eventKey: string | null) => {
        if (eventKey) {
          const selectedCategory = categories.find(category => category.key === eventKey);
          if (selectedCategory) {
            setCategoryValue(selectedCategory.value);
          }
        }
    };

    return (
        <div className={styles['main__page']}>
            <Header/>
            <div className={styles['content']}>
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                            <Link style={{color: '#3D348B'}} to="/">Subscriptions</Link>
                        </li>
                    </ol>
                </nav>
                <h1 className="mb-4">
                    Здесь вы можете подобрать выбрать для себя подходящий абонемент на какой-либо транспорт
                </h1>

                <Form className="d-flex gap-3" onSubmit={handleFormSubmit}>
                    <div className='w-100'>
                        <Form.Group style={{height: 50}} className='w-100 mb-3' controlId="search__sub.input__sub">
                            <Form.Control style={{height: '100%', borderColor: '#3D348B',}} value={titleValue} onChange={handleTitleValueChange} type="text" placeholder="Введите название абонемента..." />
                        </Form.Group>
                        <div style={{display: 'flex', gap: 10, width: '100%'}}>
                            <Dropdown style={{minWidth: '40%'}} onSelect={handleCategorySelect}>
                                <Dropdown.Toggle
                                    style={{
                                    height: 50,
                                    borderColor: '#3D348B',
                                    backgroundColor: "#fff",
                                    color: '#000',
                                    width: '100%',
                                    textAlign: 'left',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    paddingRight: '1rem'
                                    }}
                                    variant="success"
                                    id="dropdown-basic"
                                >
                                    {categoryValue}
                                    <i className="bi bi-chevron-down"></i>
                                </Dropdown.Toggle>
                                <Dropdown.Menu style={{width: '100%', textAlign: 'left',}}>
                                    {categories.map(category => (
                                    <Dropdown.Item key={category.key} eventKey={category.key}>{category.value}</Dropdown.Item>
                                    ))}
                                </Dropdown.Menu>
                            </Dropdown>
                            <Form.Group style={{height: 50, width: '35%'}} className='mb-3' controlId="search__sub.input__sub">
                                <Form.Control style={{height: '100%', borderColor: '#3D348B'}} value={priceValue} onChange={handlePriceValueChange} type="text" placeholder="Введите максимульную стоимость в рублях..." />
                            </Form.Group>
                        </div>
                        
                    </div>
                    
                    <Button style={{backgroundColor: "#3D348B", padding: "0 30px", borderColor: "#000", height: 50}} onClick={() => handleSearchButtonClick()}>Найти</Button>
                </Form>

                <div className={styles["content__cards"]}>
                    {subscriptions.map((subscription: Subscription) => (
                        <OneCard id={subscription.id} src={subscription.src} onButtonClick={() => console.log('add to application')} title={subscription.title} category={subscription.categoryTitle} price={Number(subscription.price)}></OneCard>
                    ))}
                </div>
            </div>
        </div>
    )
};
  
export default MainPage;