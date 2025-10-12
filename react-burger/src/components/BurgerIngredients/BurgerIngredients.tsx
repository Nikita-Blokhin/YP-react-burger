import React, { useState, useMemo, useRef, useEffect } from 'react'
import { Tab, Button } from 
    '@ya.praktikum/react-developer-burger-ui-components'
import { useDispatch, useSelector } from 'react-redux'

import { Ingredient } from '../../types/Ingredient'
import styles from './BurgerIngredients.module.css'
import { API } from '../../core/API'
import { 
    GET_INGREDIENTS_FAILED, GET_INGREDIENTS_REQUEST, GET_INGREDIENTS_SUCCESS, 
    MODAL_OPEN_INGREDIENT
} from '../../services/actions'
import { State } from '../../types/Services'
import IngredientDetails from '../IngredientDetails/IngredientDetails'
import IngredientCard from './IngredientCard'

interface BurgerIngredientsProps {
    constructorIngredients?: Ingredient[]
}

const BurgerIngredients: React.FC<BurgerIngredientsProps> = ({
    constructorIngredients = []
}) => {

    const dispatch = useDispatch()
    const isModal = useSelector((state: State) => state.isModal)
    const ingredients = useSelector((state: State) => state.ingredients)
    const isError = useSelector((state: State) => state.ingredientsFailed)
    const [currentTab, setCurrentTab] = useState<string>('bun')
    const [isLoading, setLoading] = useState(false)
    const breadRef = useRef<HTMLDivElement>(null)
    const sauceRef = useRef<HTMLDivElement>(null)
    const fillingRef = useRef<HTMLDivElement>(null)

    const getData = async () => {
        dispatch({
            type: GET_INGREDIENTS_REQUEST
        })
        API.getIngredients()
            .then(data => {
                dispatch({
                    type: GET_INGREDIENTS_SUCCESS,
                    ingredients: data.data
                })
                setLoading(false)
            })
            .catch(error => {
                dispatch({
                    type: GET_INGREDIENTS_FAILED
                })
                alert(error)
            })
    }

    useEffect(() => {
        setLoading(true)
        getData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const categorizedIngredients = useMemo(() => ({
        bun: ingredients.filter
            ((item: Ingredient) => item.type === 'bun') as Ingredient[],
        sauce: ingredients.filter
            ((item: Ingredient) => item.type === 'sauce') as Ingredient[],
        main: ingredients.filter
            ((item: Ingredient) => item.type === 'main') as Ingredient[]
    }), [ingredients])
    
    const getIngredientCount = (ingredient: Ingredient): number => {
        return constructorIngredients.filter
            (item => item._id === ingredient._id).length
    }

    const handleIngredientClick = (ingredient: Ingredient) => {
        dispatch({type: MODAL_OPEN_INGREDIENT, ingredientDetail: ingredient})
    }

    const handleScroll = (theme: 'bun' | 'sauce' | 'main') => {
        if (theme === 'bun') {
            if (breadRef.current) {
                breadRef.current.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                })
                setCurrentTab('bun')
            }
        } else if (theme === 'sauce') {
            if (sauceRef.current) {
                sauceRef.current.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                })
                setCurrentTab('sauce')
            }
        } else {
            if (fillingRef.current) {
                fillingRef.current.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                })
                setCurrentTab('main')
            }
        }
    }

    return (
        <div className={styles.container}>
            {isModal && <IngredientDetails />}
            {isError && <div className={styles.update}>
                <Button 
                    htmlType='button'
                    type='primary' 
                    size='large'
                    onClick={getData}
                >Обновить</Button>
            </div>}
            {!isError && <>
                <h1 className={styles.title}>Соберите бургер</h1>
                
                <div className={styles.tabs}>
                    <Tab 
                        value='bun' active={currentTab === 'bun'} 
                        onClick={() => handleScroll('bun')}
                    >
                        Булки
                    </Tab>
                    <Tab
                        value='sauce' active={currentTab === 'sauce'}
                        onClick={() => handleScroll('sauce')}
                    >
                        Соусы
                    </Tab>
                    <Tab 
                        value='main' active={currentTab === 'main'} 
                        onClick={() => handleScroll('main')}
                    >
                        Начинки
                    </Tab>
                </div>

                {isLoading ? <h2>Загрузка...</h2> : <div 
                    className={styles.ingredientsContainer}
                >
                    <div className={styles.section}>
                        <h2 className={styles.sectionTitle} ref={breadRef}>
                            Булки
                        </h2>
                        <div className={styles.ingredientsList}>
                            {categorizedIngredients.bun.map(ingredient => (
                                <IngredientCard 
                                    key={ingredient._id} 
                                    ingredient={ingredient}
                                    onClick={
                                        () => handleIngredientClick(ingredient)
                                    }
                                    getIngredientCount={getIngredientCount}
                                />
                            ))}
                        </div>
                    </div>

                    <div className={styles.section}>
                        <h2 className={styles.sectionTitle} ref={sauceRef}>
                            Соусы
                        </h2>
                        <div className={styles.ingredientsList}>
                            {categorizedIngredients.sauce.map(ingredient => (
                                <IngredientCard 
                                    key={ingredient._id} 
                                    ingredient={ingredient}
                                    onClick={
                                        () => handleIngredientClick(ingredient)
                                    }
                                    getIngredientCount={getIngredientCount}
                                />
                            ))}
                        </div>
                    </div>

                    <div className={styles.section}>
                        <h2 className={styles.sectionTitle} ref={fillingRef}>
                            Начинки
                        </h2>
                        <div className={styles.ingredientsList}>
                            {categorizedIngredients.main.map(ingredient => (
                                <IngredientCard 
                                    key={ingredient._id} 
                                    ingredient={ingredient}
                                    onClick={
                                        () => handleIngredientClick(ingredient)
                                    }
                                    getIngredientCount={getIngredientCount}
                                />
                            ))}
                        </div>
                    </div>
                </div>}
            </>}
        </div>
    )
}

export default BurgerIngredients
