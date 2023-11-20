import * as React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Header from 'components/Header';
import OneCard from 'components/Card';
import styles from './MainPage.module.scss'
import { useEffect } from 'react';
import { ChangeEvent } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import SliderFilter from 'components/Slider';
import BreadCrumbs from 'components/BreadCrumbs';
import { mockSubscriptions } from '../../../consts';
import {useDispatch} from "react-redux";
import {useCategories, useCategoryValue, useTitleValue, useSubscriptions, usePriceValues,
    setCategoriesAction, setCategoryValueAction, setTitleValueAction, setSubscriptionsAction, setPriceValuesAction} from "../../Slices/MainSlice";
import axios from 'axios';

export type Subscription = {
    id: number,
    title: string,
    price: number,
    info: string,
    src: string,
    categoryTitle: string,
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

export type ReceivedCategoryData = {
    id: number,
    title: string,
    status: string
}

export type CategoryData = {
    id: number,
    title: string,
}

export type ReceivedUserData = {
    id: number,
    email: string,
    full_name: string,
    phone_number: string,
    password: string,
    is_superuser: boolean,
}


const MainPage: React.FC = () => {
    const dispatch = useDispatch()
    const dropdownCategories = useCategories();
    const categoryValue = useCategoryValue();
    const titleValue = useTitleValue();
    const subscriptions = useSubscriptions();
    const priceValues = usePriceValues();

    const linksMap = new Map<string, string>([
        ['Абонементы', '/']
    ]);

    const getSubscriptions = async () => {
        let url = 'http://127.0.0.1:8000/subscriptions'
        if (titleValue) {
            url += `?title=${titleValue}`
            if (categoryValue && categoryValue !== 'Все категории') {
                url += `&category=${categoryValue}`
            }
            if (priceValues) {
                url += `&min_price=${priceValues[0]}&max_price=${priceValues[1]}`
            }
        } else if(categoryValue && categoryValue !== 'Все категории') {
            url += `?category=${categoryValue}`
            if (priceValues) {
                url += `&min_price=${priceValues[0]}&max_price=${priceValues[1]}`
            }
        } else if (priceValues){
            url += `?min_price=${priceValues[0]}&max_price=${priceValues[1]}`
        }
        try {
            const response = await axios.get(url, { withCredentials: true });
            const jsonData = response.data;
            const newRecipesArr = jsonData.map((raw: ReceivedSubscriptionData) => ({
                id: raw.id,
                title: raw.title,
                price: raw.price,
                info: raw.info,
                src: raw.src,
                categoryTitle: raw.category
            }));
        
            dispatch(setSubscriptionsAction(newRecipesArr));
        }
        catch {
            console.log('запрос не прошел !')
            if (categoryValue && categoryValue !== 'Все категории') {
                const filteredArray = mockSubscriptions.filter(mockSubscription => mockSubscription.categoryTitle === categoryValue);
                dispatch(setSubscriptionsAction(filteredArray));
            } else if (titleValue) {
                const filteredArray = mockSubscriptions.filter(mockSubscription => mockSubscription.title.includes(titleValue));
                dispatch(setSubscriptionsAction(filteredArray));
            } else if (priceValues) {
                const filteredArray = mockSubscriptions.filter(mockSubscription => mockSubscription.price <= priceValues[1]);
                dispatch(setSubscriptionsAction(filteredArray));
            }
            else {
                dispatch(setSubscriptionsAction(mockSubscriptions));
            }
        }
    };

    const getCategories = async () => {
        let url = 'http://127.0.0.1:8000/categories'
        try {
            const response = await axios.get(url)
            const categories = response.data.map((raw: ReceivedCategoryData) => ({
                id: raw.id,
                title: raw.title
            }))
            categories.unshift({ id: 100000, title: 'Все категории' });
            console.log(categories)
            dispatch(setCategoriesAction(categories))
        } catch {
            console.log('запрос не прошел !')
        }
    }
    useEffect(() => {
        getSubscriptions();
        getCategories();
    }, []);

    const handleSearchButtonClick = () => {
        getSubscriptions();
    }

    const handleTitleValueChange = (event: ChangeEvent<HTMLInputElement>) => {
        dispatch(setTitleValueAction(event.target.value));
    };

    const handleSliderChange = (values: number[]) => {
        console.log('djfkdfjkd')
        console.log(values[0], values[1])
        dispatch(setPriceValuesAction(values));
    };

    const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    };

    const handleCategorySelect = (eventKey: string | null) => {
        if (eventKey !== null) {
          const selectedCategory = dropdownCategories.find(category => category.id === parseInt(eventKey, 10));
          if (selectedCategory) {
            dispatch(setCategoryValueAction(selectedCategory.title));
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
                                    {dropdownCategories.map(category => (
                                        <Dropdown.Item key={category.id} eventKey={category.id}>{category.title}</Dropdown.Item>
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