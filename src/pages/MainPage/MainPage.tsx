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
import SliderFilter from 'components/Slider';
import BreadCrumbs from 'components/BreadCrumbs';

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
    const [sliderValues, setSliderValues] = useState([0, 10000]);
    const linksMap = new Map<string, string>([
        ['Абонементы', '/']
    ]);

    const fetchSubscriptions = async () => {
        let url = 'http://127.0.0.1:8000/subscriptions'
        if (titleValue) {
            url += `?title=${titleValue}`
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
            const response = await fetch(url, {
                credentials: 'include'
            });
            const jsonData = await response.json();
            // const newRecipesArr = jsonData.subscriptions.map((raw: ReceivedSubscriptionData) => ({
            const newRecipesArr = jsonData.map((raw: ReceivedSubscriptionData) => ({
                id: raw.id,
                title: raw.title,
                price: raw.price,
                info: raw.info,
                src: raw.src,
                categoryTitle: raw.category
            }));
        
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

    const handleSliderChange = (values: number[]) => {
        setSliderValues(values);
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
                <BreadCrumbs links={linksMap}></BreadCrumbs>

                <h1 className="mb-4" style={{fontSize: 30}}>
                    Здесь вы можете подобрать выбрать для себя подходящий абонемент на какой-либо транспорт
                </h1>

                <Form className="d-flex gap-3" onSubmit={handleFormSubmit}>
                    <div className='w-100'>
                        <Form.Group style={{height: 60}} className='w-100 mb-3' controlId="search__sub.input__sub">
                            <Form.Control style={{height: '100%', borderColor: '#3D348B', fontSize: 18}} value={titleValue} onChange={handleTitleValueChange} type="text" placeholder="Введите название абонемента..." />
                        </Form.Group>
                        <div style={{display: 'flex', gap: 10, width: '100%', justifyContent: 'space-between', alignItems: 'flex-end'}}>
                            <Dropdown style={{minWidth: '40%'}} onSelect={handleCategorySelect}>
                                <Dropdown.Toggle
                                    style={{
                                    height: 60,
                                    borderColor: '#3D348B',
                                    backgroundColor: "#fff",
                                    color: '#000',
                                    width: '100%',
                                    textAlign: 'left',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    paddingRight: '1rem',
                                    fontSize: 18
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
                            <SliderFilter
                                onChangeValues={handleSliderChange}
                                minimum={0}
                                maximum={10000}
                                title="Диапазон цен:"
                            />
                        </div>
                        
                    </div>
                    
                    <Button style={{backgroundColor: "#2787F5", padding: "15px 40px", borderColor: "#000", fontSize: 18, height: 60}} onClick={() => handleSearchButtonClick()}>Найти</Button>
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