import * as React from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Header from 'components/Header';
import OneCard from 'components/Card';
import styles from './SubscriptionsPage.module.scss'
import { ChangeEvent } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import SliderFilter from 'components/Slider';
import BreadCrumbs from 'components/BreadCrumbs';
import { toast } from 'react-toastify';
import { mockSubscriptions } from '../../../consts';
import {useDispatch} from "react-redux";
import {useCategories, useCategoryValue, useTitleValue, useSubscriptions, usePriceValues,
     setCategoryValueAction, setTitleValueAction, setSubscriptionsAction, setPriceValuesAction} from "../../Slices/MainSlice";

import { useLinksMapData, setLinksMapDataAction } from 'Slices/DetailedSlice';

import { useSubscripitonsFromApplication, setSubscriptionsFromApplicationAction } from 'Slices/ApplicationsSlice';

export type Subscription = {
    id: number,
    title: string,
    price: number,
    info: string,
    src: string,
    categoryTitle: string,
}

export type ReceivedSubscriptionData = {
    id: number;
    title: string;
    price: number;
    info: string;
    src: string;
    id_category: number;
    category: string;
}

export type ReceivedCategoryData = {
    id: number,
    title: string,
}

export type CategoryData = {
    id: number,
    title: string,
    status: string
}

export type ReceivedUserData = {
    id: number,
    email: string,
    full_name: string,
    phone_number: string,
    password: string,
    is_superuser: boolean,
}


const SubscriptionsPage: React.FC = () => {
    const dispatch = useDispatch()
    const dropdownCategories = useCategories();
    const categoryValue = useCategoryValue();
    const titleValue = useTitleValue();
    const subscriptions = useSubscriptions();
    const priceValues = usePriceValues();
    const subscripitonsFromApplication = useSubscripitonsFromApplication();
    const linksMap = useLinksMapData();

    // const linksMap = new Map<string, string>([
    //     ['Абонементы', '/']
    // ]);

    React.useEffect(() => {
        dispatch(setLinksMapDataAction(new Map<string, string>([
            ['Абонементы', '/subscriptions']
        ])))
    }, [])

    const getSubscriptions = async () => {
        let url = 'http://localhost:8000/subscriptions'
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
            const response = await axios(url, {
                method: 'GET',
                withCredentials: true 
            });
            const jsonData = response.data.subscriptions;
            const newArr = jsonData.map((raw: ReceivedSubscriptionData) => ({
                id: raw.id,
                title: raw.title,
                price: raw.price,
                info: raw.info,
                src: raw.src,
                categoryTitle: raw.category
            }));
            dispatch(setSubscriptionsAction(newArr));
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

    const postSubscriptionToApplication = async (id: number) => {
        try {
            const response = await axios(`http://localhost:8000/subscriptions/${id}/post`, {
                method: 'POST',
                withCredentials: true,
            })
            const addedSubscription = {
                id: response.data.id,
                title: response.data.title,
                price: response.data.price,
                info: response.data.info,
                src: response.data.src,
                categoryTitle: response.data.category
            }
            dispatch(setSubscriptionsFromApplicationAction([...subscripitonsFromApplication, addedSubscription]))
            toast.success("Абонемент успешно добавлен в заявку!");
        } catch {
            toast.error("Абонемент данной категории уже добавлен в заявку!");
        }
    }

    const handleSearchButtonClick = () => {
        getSubscriptions();
    }

    const handleTitleValueChange = (event: ChangeEvent<HTMLInputElement>) => {
        dispatch(setTitleValueAction(event.target.value));
    };

    const handleSliderChange = (values: number[]) => {
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
            <div className={styles['main__page-wrapper']}>
                <BreadCrumbs links={linksMap}></BreadCrumbs>

                <h1 className={styles['main__page-title']}>
                    Список всех доступных абонементов на транспорт 
                </h1>
                <h5 className={styles['main__page-subtitle']}>
                    Также вы может найти абонемент по определенным фильтрам, которые представлены ниже!
                </h5>

                <Form className={styles['form']} onSubmit={handleFormSubmit}>
                    <div className={styles.form__wrapper}>
                        {/* <Form.Group controlId="search__sub.input__sub"> */}
                        <div className={styles['form__input-block']}>
                            <Form.Control className={styles.form__input} value={titleValue} onChange={handleTitleValueChange} type="text" placeholder="Введите название абонемента..." />
                            <Button className={styles.form__button} onClick={() => handleSearchButtonClick()}>Найти</Button>
                        </div>
                        {/* </Form.Group> */}
                        <div className={styles['form__dropdown-wrapper']}>
                            <Dropdown className={styles.form__dropdown} onSelect={handleCategorySelect}>
                                <Dropdown.Toggle
                                    className={styles['form__dropdown-toggle']}
                                    style={{
                                        borderColor: '#000',
                                        backgroundColor: "#fff",
                                        color: '#000',
                                    }}
                                >
                                    {categoryValue}
                                    <i className="bi bi-chevron-down"></i>
                                </Dropdown.Toggle>
                                <Dropdown.Menu className={styles['form__dropdown-menu']}>
                                    {dropdownCategories.map(category => (
                                        <Dropdown.Item key={category.id} eventKey={category.id}>{category.title}</Dropdown.Item>
                                    ))}
                                </Dropdown.Menu>
                            </Dropdown>
                            <SliderFilter
                                onChangeValues={handleSliderChange}
                                minimum={0}
                                maximum={10000}
                                currentValues={priceValues}
                                title="Диапазон цен:"
                            />
                        </div>
                        <Button className={styles['form__mobile-button']} onClick={() => handleSearchButtonClick()}>Найти</Button>
                    </div>
                </Form>

                <div className={styles["main__page-cards"]}>
                    {subscriptions.map((subscription: Subscription) => (
                        <OneCard id={subscription.id} src={subscription.src} onButtonClick={() => postSubscriptionToApplication(subscription.id)} title={subscription.title} category={subscription.categoryTitle} price={Number(subscription.price)}></OneCard>
                    ))}
                </div>
            </div>
        </div>
    )
};
  
export default SubscriptionsPage;