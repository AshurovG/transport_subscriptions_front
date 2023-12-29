import React, { useState, ChangeEvent } from 'react'
import { toast } from 'react-toastify';
import axios from 'axios';
// import cn from 'classnames';
import styles from './CustomTable.module.scss'
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import AddButton from 'components/Icons/AddButton';
import EditIcon from 'components/Icons/EditIcon';
import BasketIcon from 'components/Icons/BasketIcon';
import ModalWindow from 'components/ModalWindow';
import Form from 'react-bootstrap/Form';
import Dropdown from 'react-bootstrap/Dropdown';
import ArrowDownIcon from 'components/Icons/ArrowDownIcon';
import {useCategories, useCategoryValue, useTitleValue, useSubscriptions, usePriceValues,
  setCategoryValueAction, setTitleValueAction, setSubscriptionsAction, setPriceValuesAction} from "../../Slices/MainSlice";
import { useDispatch } from 'react-redux';
import ImageIcon from 'components/Icons/ImageIcon';

export type ReceivedSubscriptionData = {
  id: number;
  title: string;
  price: number;
  info: string;
  src: string;
  id_category: number;
  category: string;
}

export type CategoryData = {
  id: number;
  title: string;
}

type ColumnData = {
  key: string;
  title: string;
}

export type TableData = {
  columns: ColumnData[];
  data: any[];
  children?: React.ReactNode;
  flag: 0 | 1 | 2 | 3;
  className?: string;
  // handleUsersButtonCLick?: (event: EventData) => void;
  // handleChangeButtonClick?: (event: EventData) => void;
  // handleDeleteButtonClick?: () => void;
};

export type SubscriptionData =  {
  id: number,
  title: string,
  price: number,
  info: string,
  src: string,
  categoryTitle: string
};

const CustomTable: React.FC<TableData> = ({columns, data, className}) => {
  const categories = useCategories()
  const subscriptions = useSubscriptions()
  const dispatch = useDispatch()

  const [isAddModalWindowOpened, setIsAddModalWindowOpened] = useState(false)
  const [isEditModalWindowOpened, setIsEditModalWindowOpened] = useState(false)
  const [isDeleteModalWindowOpened, setIsDeleteModalWindowOpened] = useState(false)
  const [isImageModalWindowOpened, setIsImageModalWindowOpened] = useState(false)

  const [subscriptionTitleValue, setSubscriptionTitleValue] = useState('')
  const [categoryValue, setCategoryValue] = useState<CategoryData | undefined>(categories[1])
  const [subscriptionInfoValue, setSubscriptionInfoValue] = useState('')
  const [subscriptionPriceValue, setSubscriptionPriceValue] = useState('')
  const [currentSubscriptionId, setCurrentSubscriptionId] = useState<number>()
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [currentImage, setCurrentImage] = useState('')

  const [isValid, setIsValid] = useState(false)

  const postSubscription = async () => {
    try {
      const response = await axios(`http://localhost:8000/subscriptions/post`, {
        method: 'POST',
        data: {
          title: subscriptionTitleValue,
          price: Number(subscriptionPriceValue),
          info: subscriptionInfoValue,
          id_category: categoryValue?.id
        },
        withCredentials: true
      })
      setIsAddModalWindowOpened(false)
      dispatch(setSubscriptionsAction([...subscriptions, {
        id: response.data.id,
        title:  response.data.title,
        price:  response.data.price,
        info: response.data.info,
        src: '',
        categoryTitle: categoryValue ? categoryValue.title : ''
      }]))
      toast.success('Абонемент успешно добавлен!')
    } catch(e) {
      toast.error('Абонемент с таким названием уже существует!')
    }
  }

  const putSubscription = async (id: number) => {
    try {
      const response = await axios(`http://localhost:8000/subscriptions/${id}/put`, {
        method: 'PUT',
        data: {
          title: subscriptionTitleValue,
          price: Number(subscriptionPriceValue),
          info: subscriptionInfoValue,
          id_category: categoryValue?.id,
          status: "enabled"
        },
        withCredentials: true
      })
      setIsEditModalWindowOpened(false)
      const updatedSubscriptions = subscriptions.map(subscription => {
        if (subscription.id === id) {
          return {
            ...subscription,
            title: response.data.title,
            price: response.data.price,
            info: response.data.info,
            src: response.data.src,
            categoryTitle :categoryValue ? categoryValue.title : ''
          };
        }
        return subscription;
      });

      dispatch(setSubscriptionsAction(updatedSubscriptions))
      toast.success('Информация успешно обновлена!')
    } catch(e) {
      toast.error('Абонемент с таким названием уже существует!')
    }
  }
  
  const deleteSubscription = async () => {
    try {
      await axios(`http://localhost:8000/subscriptions/${currentSubscriptionId}/delete`, {
        method: 'DELETE',
        withCredentials: true,

      })

      dispatch(setSubscriptionsAction(subscriptions.filter((subscription) => {
        return subscription.id !== currentSubscriptionId 
      })))
      setIsDeleteModalWindowOpened(false)
      toast.success('Абонемент успешно удален!')
    } catch(e) {
      throw e
    }
  }

  const handleUpload = async () => {
    if (selectedImage) {
      try {
        const formData = new FormData();
        formData.append('file', selectedImage);

        const response = await axios.post(
          `http://localhost:8000/subscriptions/${currentSubscriptionId}/image/post`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
            withCredentials: true,
          }
        );
        const updatedSubscriptions = subscriptions.map(subscription => {
          if (subscription.id === currentSubscriptionId) {
            return {
              ...subscription,
              src: response.data
            };
          }
          return subscription;
        });
        dispatch(setSubscriptionsAction(updatedSubscriptions))
        console.log(updatedSubscriptions)
        setSelectedImage(null)
        toast.success('Изображение успешно загружено')

      } catch (error) {
        console.error('Error uploading image:', error);
      } finally {
        setIsImageModalWindowOpened(false)
      }
    }
  };

  const handleSubscriptionFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (isAddModalWindowOpened) {
      postSubscription()
    } else if(currentSubscriptionId) {
      putSubscription(currentSubscriptionId)
    }
  }

  const handleEditButtonClick = (subscription: SubscriptionData) => {
    setCurrentSubscriptionId(subscription.id)
    setIsEditModalWindowOpened(true);
    setSubscriptionTitleValue(subscription.title)
    setSubscriptionPriceValue((subscription.price.toString()))
    setSubscriptionInfoValue(subscription.info)
    setCategoryValue(categories.find(category => category.title === subscription.categoryTitle))
  }

  const handleDeleteButtonClick = (id: number) => {
    setCurrentSubscriptionId(id)
    setIsDeleteModalWindowOpened(true)
  }

  const handleImageButtonClick = (subscription: SubscriptionData) => {
    setCurrentSubscriptionId(subscription.id)
    setIsImageModalWindowOpened(true)
    setCurrentImage(subscription.src)
  }

  const handleCategorySelect = (eventKey: string | null) => {
    if (eventKey !== null) {
      const selectedCategory = categories.find(category => category.id === parseInt(eventKey, 10));
      if (selectedCategory && selectedCategory.id !== categoryValue?.id && selectedCategory) {
        setCategoryValue(selectedCategory)
      }
    }
  };

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(file);
    }
  };

  return (
    <>
    <span className={`${styles['table__add-text']}`}>Хотите добавить новый абонемент ?</span><AddButton onClick={() => setIsAddModalWindowOpened(true)}/>
      <div className={`${styles.table__container} ${className}`}>
      <div className={`${styles.table__add} ${className}`}>
      </div>
      <Table>
          <thead>
            <tr>
              {columns.map((column, index) => (
                <th key={index}>{column.title}</th>
              ))}
              {<th>Действия</th>}
            </tr>
          </thead>
          <tbody>
            {data.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {columns.map((column, columnIndex) => (
                  <td key={columnIndex}>{row[column.key]}</td>
                ))}
                <td className={styles.table__action}>
                  <EditIcon onClick={() => handleEditButtonClick(row)}/>
                  <ImageIcon onClick={() => handleImageButtonClick(row)}/>
                  <BasketIcon onClick={() => handleDeleteButtonClick(row.id)}/>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        <ModalWindow handleBackdropClick={() => {setIsAddModalWindowOpened(false); setIsEditModalWindowOpened(false); subscriptionTitleValue && setSubscriptionTitleValue(''); subscriptionPriceValue && setSubscriptionPriceValue(''); subscriptionInfoValue && setSubscriptionInfoValue('')}}
        className={styles.modal} active={isAddModalWindowOpened || isEditModalWindowOpened}>
          <h3 className={styles.modal__title}>Заполните данные</h3>
          <Form onSubmit={(event: React.FormEvent<HTMLFormElement>) => handleSubscriptionFormSubmit(event)}
          className={styles['form']}>
            <Dropdown className={styles['dropdown']} onSelect={handleCategorySelect}>
              <Dropdown.Toggle
                  className={styles['dropdown__toggle']}
                  style={{
                      borderColor: '#2787F5',
                      backgroundColor: "#fff",
                      color: '#000',
                  }}
              >   
                {categoryValue?.title}
                <ArrowDownIcon className={styles.dropdown__icon}/>
              </Dropdown.Toggle>
              <Dropdown.Menu className={styles['dropdown__menu']}>
                {categories
                  .map(category => (
                    category.title !== 'Все категории' && <Dropdown.Item className={styles['dropdown__menu-item']} key={category.id} eventKey={category.id}>
                      {category.title}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
             </Dropdown>
            <div className={styles.form__item}>
              <Form.Control onChange={(event: ChangeEvent<HTMLInputElement>) => {setSubscriptionTitleValue(event.target.value)}} value={subscriptionTitleValue} className={styles.form__input} type="text" placeholder="Название абонемента*" />
            </div>
            <div className={styles.form__item}>
              <Form.Control onChange={(event: ChangeEvent<HTMLInputElement>) => {setSubscriptionPriceValue(event.target.value); isNaN(Number(event.target.value)) ? setIsValid(false) : setIsValid(true)}} value={subscriptionPriceValue} className={styles.form__input} type="text" placeholder="Стоимость*" />
            </div>
            <div className={styles.form__item}>
              <Form.Control
                as="textarea"
                onChange={(event: ChangeEvent<HTMLTextAreaElement>) => setSubscriptionInfoValue(event.target.value)}
                value={subscriptionInfoValue}
                className={styles.form__textarea}
                placeholder="Описание*"
                style={{borderColor: '#2787F5'}}
              />
            </div>
            <Button disabled={subscriptionTitleValue && subscriptionPriceValue && subscriptionInfoValue && isValid ? false : true} type='submit'>Сохранить</Button>
          </Form>
        </ModalWindow>

        <ModalWindow handleBackdropClick={() => setIsDeleteModalWindowOpened(false)} active={isDeleteModalWindowOpened} className={styles.modal}>
          <h3 className={styles.modal__title}>Вы уверены, что хотите удалить данную комнату?</h3>
          <div className={styles['modal__delete-btns']}>
            <Button onClick={() => {deleteSubscription()}} className={styles.modal__btn}>Подтвердить</Button>
            <Button onClick={() => setIsDeleteModalWindowOpened(false)} className={styles.modal__btn}>Закрыть</Button>
          </div>
        </ModalWindow>

        {/* <ModalWindow handleBackdropClick={() => setIsDeleteModalWindowOpened(false)} active={isDeleteModalWindowOpened} className={styles.modal}>
          <h3 className={styles.modal__title}>Вы уверены, что хотите удалить данную комнату?</h3>
          <div className={styles['modal__delete-btns']}>
            <Button onClick={() => {deleteSubscription()}} className={styles.modal__btn}>Подтвердить</Button>
            <Button onClick={() => setIsDeleteModalWindowOpened(false)} className={styles.modal__btn}>Закрыть</Button>
          </div>
        </ModalWindow> */}

        <ModalWindow handleBackdropClick={() => {setIsImageModalWindowOpened(false); setSelectedImage(null)}} active={isImageModalWindowOpened } className={styles.modal}>
          <h3 className={styles.modal__title}>Выберите картинку</h3>
          {currentImage && <h4 className={styles.modal__subtitle}>Текущее изображение</h4>}
          <div className={styles.dropzone__container}>
          <div className="dropzone__wrapper">
          <img className={styles.dropzone__image} src={currentImage} alt="" />
          {selectedImage && <p className={styles.dropzone__filename}>Вы загрузили: <b>{selectedImage.name}</b></p>}
            <label className={styles.dropzone__btn} htmlFor="upload">
              <span className={styles['dropzone__btn-text']}>Загрузите изображение</span>
            </label>
            <input className={styles.dropzone__input} id="upload" type="file" onChange={handleImageChange} />
          </div>
          </div>
          <Button disabled={selectedImage ? false : true} className={styles.dropzone__button} onClick={handleUpload}>Сохранить</Button>
          
        </ModalWindow>
      </div>
    </>
  );
}

export default CustomTable