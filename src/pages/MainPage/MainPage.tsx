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

const categories = [
    {
        key: "scooter",
        value: "Самокаты"
    },
    {
        key: "mcd",
        value: "МЦД"
    },
    {
        key: "underground",
        value: "Метро / МЦК"
    },
    {
        key: "bike",
        value: "Велосипеды"
    },
]



const mockSubscriptions = [
    {
        id: 5,
        categoryTitle: "Велосипеды",
        title: "30 дней",
        price: 500,
        info: "Дополнительная информация об абонементе",
        src: "https://velobaza.ru/upload/medialibrary/6fe/gornii_velosiped_3.jpg",
        status: "enabled",
        idCategory: 1
    },
    {
        id: 7,
        categoryTitle: "Велосипеды",
        title: "365 дней",
        price: 4000,
        info: "Дополнительная информация об абонементе",
        src: "https://velobaza.ru/upload/medialibrary/6fe/gornii_velosiped_3.jpg",
        status: "enabled",
        idCategory: 1
    },
    {
        id: 8,
        categoryTitle: "Самокаты",
        title: "Бесплатный старт 30 дней",
        price: 400,
        info: "Дополнительная информация об абонементе",
        src: "https://girosmart.ru/image/catalog/sw_photos/1231/elektrosamokat-kugoo-m4-pro-chernyy-17ah-new-2020-1.jpg",
        status: "enabled",
        idCategory: 1
    },
    {
        id: 1,
        categoryTitle: "МЦД",
        title: "5 поездок",
        price: 1000,
        info: "информация про мцд",
        src: "https://myskillsconnect.com/uploads/posts/2023-06/1686528414_myskillsconnect-com-p-mtsd-poezda-vnutri-foto-26.jpg",
        status: "enabled",
        idCategory: 1
    },
    {
        id: 3,
        categoryTitle: "МЦД",
        title: "15 поездок",
        price: 1500,
        info: "информация про мцд",
        src: "https://myskillsconnect.com/uploads/posts/2023-06/1686528414_myskillsconnect-com-p-mtsd-poezda-vnutri-foto-26.jpg",
        status: "enabled",
        idCategory: 1
    },
    {
        id: 4,
        categoryTitle: "МЦД",
        title: "30 поездок",
        price: 2500,
        info: "информация про мцд",
        src: "https://myskillsconnect.com/uploads/posts/2023-06/1686528414_myskillsconnect-com-p-mtsd-poezda-vnutri-foto-26.jpg",
        status: "enabled",
        idCategory: 1
    }
]

const MainPage: React.FC = () => {
    const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
    const [categoryValue, setCategoryValue] = useState<string>('')
    const [titleValue, setTitleValue] = useState<string>('')
    const [priceValue, setPriceValue] = useState<number>()
    const fetchSubscriptions = async () => {
        let response = null;
        let url = 'http://127.0.0.1:8000/subscriptions'
        if (titleValue) {
            url += `?title=${titleValue}`
            console.log(url)
            if (categoryValue) {
                url += `&category=${categoryValue}`
            }
            if (priceValue) {
                url += `&max_price=${priceValue}`
            }
        } else if(categoryValue) {
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
            const newRecipesArr = jsonData.map((raw: ReceivedSubscriptionData) => ({
                id: raw.id,
                title: raw.title,
                price: raw.price,
                info: raw.info,
                src: raw.src,
                categoryTitle: raw.category
            }))
            setSubscriptions(newRecipesArr);
        }
        catch {
            if (categoryValue) {
                const filteredArray = mockSubscriptions.filter(mockSubscription => mockSubscription.categoryTitle === categoryValue);
                setSubscriptions(filteredArray);
            } else if (titleValue) {
                const filteredArray = mockSubscriptions.filter(mockSubscription => mockSubscription.title.includes(titleValue));
                setSubscriptions(filteredArray);
            } else if (priceValue) {
                const filteredArray = mockSubscriptions.filter(mockSubscription => mockSubscription.price <= priceValue);
                setSubscriptions(filteredArray);
            }

            // if (titleValue) {
            //     const filteredArray = mockSubscriptions.filter(mockSubscription => mockSubscription.categoryTitle.includes(categoryValue));
            //     setSubscriptions(filteredArray);
            // }
            
            else {
                setSubscriptions(mockSubscriptions);
            }
            // const filteredArray = mockSubscriptions.filter(mockSubscription => mockSubscription.categoryTitle === categoryValue);
            // setSubscriptions(mockSubscriptions);
            // console.log('fjkdlfjkld')
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
                                    paddingRight: '1rem' // Добавляем отступ справа для стрелочки
                                    }}
                                    variant="success"
                                    id="dropdown-basic"
                                >
                                    {categoryValue}
                                    <i className="bi bi-chevron-down"></i> {/* Иконка стрелочки */}
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