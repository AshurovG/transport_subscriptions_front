import React, { useState, ChangeEvent } from 'react'
import styles from './AdminSubscriptionsPage.module.scss'
import {useDispatch} from "react-redux";
import {useCategories, useCategoryValue, useTitleValue, useSubscriptions, usePriceValues,
     setCategoryValueAction, setTitleValueAction, setSubscriptionsAction, setPriceValuesAction, setCategoriesAction} from "../../Slices/MainSlice";
import { toast } from 'react-toastify';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import { Dropdown } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Header from 'components/Header';
import CustomTable from 'components/CustomTable';
import ModalWindow from 'components/ModalWindow';
import ArrowDownIcon from 'components/Icons/ArrowDownIcon';
import EditIcon from 'components/Icons/EditIcon';
import BasketIcon from 'components/Icons/BasketIcon';
import AddButton from 'components/Icons/AddButton';





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

const columns = [
    {
        key: 'categoryTitle',
        title: 'Категория'
    },
    {
        key: 'title',
        title: 'Название абонемента'
    },
    {
        key: 'price',
        title: 'Стоимость'
    },
]

const AdminSubscriptionsPage = () => {
    const dispatch = useDispatch()
    const subscriptions = useSubscriptions()
    const categories = useCategories()
    const [categoryValue, setCategoryValue] = useState<CategoryData | undefined>(categories[1])
    const [newCategoryValue, setNewCategoryValue] = useState('')
    const [isAddModalWindowOpened, setIsAddModalWindowOpened] = useState(false)
    const [isEditModalWindowOpened, setIsEditModalWindowOpened] = useState(false)
    const [isDeleteModalWindowOpened, setIsDeleteModalWindowOpened] = useState(false)

    const postCategory = async () => {
        try {
          const response = await axios(`http://localhost:8000/categories/post`, {
            method: 'POST',
            data: {
              title: newCategoryValue
            },
            withCredentials: true
          })
          setIsAddModalWindowOpened(false)
          dispatch(setCategoriesAction([...categories, response.data]))
          toast.success('Категория успешно добавлена!')
        } catch(e) {
          toast.error('Такая категория уже существует!')
          throw e
        }
    }

    const putCategory = async () => {
        try {
          const response = await axios(`http://localhost:8000/categories/${categoryValue?.id}/put`, {
            method: 'PUT',
            data: {
              title: newCategoryValue
            },
            withCredentials: true
          })

          const updatedCategories = categories.map(category => {
            if (category.id === categoryValue?.id) {
              return {
                ...category,
                title: response.data.title
              };
            }
            return category;
          });
          dispatch(setCategoriesAction(updatedCategories))
          if (categoryValue) {
            setCategoryValue({
                id: categoryValue?.id,
                title: newCategoryValue
            })
          }
          setIsEditModalWindowOpened(false)
          toast.success('Информация успешно обновлена!')
        } catch(e) {
          toast.error('Такая категория уже существует!')
          throw e
        }
    }

    const deleteCategory = async () => {
        try {
          await axios(`http://localhost:8000/categories/${categoryValue?.id}/delete`, {
            method: 'DELETE',
            data: {
              title: newCategoryValue
            },
            withCredentials: true
          })
          setIsDeleteModalWindowOpened(false)
          dispatch(setCategoriesAction(categories.filter((category) => {
            return category.id !== categoryValue?.id
          })))

          setCategoryValue(categories[1])
          setNewCategoryValue('')
          toast.success('Категория успешно удалена')
        } catch(e) {
          throw e
        }
    }

    const handleCategorySelect = (eventKey: string | null) => {
        if (eventKey !== null) {
          const selectedCategory = categories.find(category => category.id === parseInt(eventKey, 10));
          if (selectedCategory && selectedCategory.id !== categoryValue?.id && selectedCategory) {
            setCategoryValue(selectedCategory)
          }
        }
    };

    const handleAddButtonClick = () => {
        setIsAddModalWindowOpened(true)
    }

    const handleEditButtonClick = () => {
        setIsEditModalWindowOpened(true)
        if (categoryValue) {
            setNewCategoryValue(categoryValue.title)
        }
    }

    const handleDeleteButtonClick = () => {
        setIsDeleteModalWindowOpened(true)
    }


    const handleCategoryFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        if (isAddModalWindowOpened) {
            postCategory()
        } else {
            putCategory()
        }
        
    }
    
    React.useEffect(() => {
        console.log(11111)
    }, [])
  return (
    <div className={styles.admin__page}>
        <Header/>

        <div className={styles['admin__page-wrapper']}>
        <div className={styles['admin__page-categories']}>
                    <h1 className={styles['admin__page-title']}>Управление категориями</h1>
                    <div className={styles['admin__page-categories-content']}>
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
                            <div className={styles['admin__page-categories-actions']}>
                            <td className={styles.table__action}>
                                <AddButton onClick={() => handleAddButtonClick()}/>
                                <EditIcon onClick={() => handleEditButtonClick()}/>
                                <BasketIcon onClick={() => handleDeleteButtonClick()}/>
                            </td>
                        </div>
                    </div>
                </div>
            <h1 className={styles['admin__page-title']}>Список абонементов</h1>

            <div className={styles['admin__page-title']}>
                <CustomTable className={styles['admin__page-table']} data={subscriptions} 
                columns={columns} flag={2} ></CustomTable>
                
                
            </div>
                    
        </div>
        <ModalWindow handleBackdropClick={() => {setIsAddModalWindowOpened(false); setIsEditModalWindowOpened(false); newCategoryValue && setNewCategoryValue('')}}
                className={styles.modal} active={isAddModalWindowOpened || isEditModalWindowOpened}>
                <h3 className={styles.modal__title}>Заполните данные</h3>
                <Form onSubmit={(event: React.FormEvent<HTMLFormElement>) => handleCategoryFormSubmit(event)}
                className={styles['form']}>
                    <div className={styles.form__item}>
                    <Form.Control onChange={(event: ChangeEvent<HTMLInputElement>) => {setNewCategoryValue(event.target.value)}} value={newCategoryValue} className={styles.form__input} type="text" placeholder="Название категории*" />
                    </div>
                    <Button disabled={newCategoryValue.length !== 0 ? false : true} type='submit'>Сохранить</Button>
                </Form>
            </ModalWindow>

            <ModalWindow handleBackdropClick={() => setIsDeleteModalWindowOpened(false)} active={isDeleteModalWindowOpened} className={styles.modal}>
            <h3 className={styles.modal__title}>Вы уверены, что хотите удалить данную категорию?</h3>
            <div className={styles['modal__delete-btns']}>
                <Button onClick={() => deleteCategory()} className={styles.modal__btn}>Подтвердить</Button>
                <Button onClick={() => setIsDeleteModalWindowOpened(false)} className={styles.modal__btn}>Закрыть</Button>
            </div>
            </ModalWindow>
    </div>
  )
}

export default AdminSubscriptionsPage