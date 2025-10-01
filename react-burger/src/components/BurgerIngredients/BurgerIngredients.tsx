import React, { useState, useMemo, useRef, useEffect } from 'react'
import { Tab, Counter, CurrencyIcon, Button } from 
    '@ya.praktikum/react-developer-burger-ui-components'

import { Ingredient } from '../../types/ingredient'
import styles from './BurgerIngredients.module.css'

interface BurgerIngredientsProps {
    onIngredientClick?: (ingredient: Ingredient) => void
    constructorIngredients?: Ingredient[]
}

const BurgerIngredients: React.FC<BurgerIngredientsProps> = ({
    onIngredientClick,
    constructorIngredients = []
}) => {
    const [currentTab, setCurrentTab] = useState<string>('bun')
    const [ingredients, setIngredients] = useState<Ingredient[]>([])
    const [isError, setIsError] = useState<boolean>(false)
    const breadRef = useRef<HTMLDivElement>(null)
    const sauceRef = useRef<HTMLDivElement>(null)
    const fillingRef = useRef<HTMLDivElement>(null)

    const data = async () => {
        fetch('https://norma.nomoreparties.space/api/ingredients')
            .then(response => response.json())
            .then(data => {
                setIngredients(data.data)
                setIsError(false)
            })
            .catch(error => {
                alert(error)
                setIsError(true)
            })
    }

    useEffect(() => {
        data()
    }, [])

    const categorizedIngredients = useMemo(() => ({
        bun: ingredients.filter
            (item => item.type === 'bun') as Ingredient[],
        sauce: ingredients.filter
            (item => item.type === 'sauce') as Ingredient[],
        main: ingredients.filter
            (item => item.type === 'main') as Ingredient[]
    }), [ingredients])
    
    const getIngredientCount = (ingredient: Ingredient): number => {
        return constructorIngredients.filter
            (item => item._id === ingredient._id).length
    }

    const handleIngredientClick = (ingredient: Ingredient) => {
        onIngredientClick?.(ingredient)
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
            {isError && <div className={styles.update}>
                <Button 
                    htmlType="button" 
                    type="primary" 
                    size="large"
                    onClick={data}
                >Обновить</Button>
            </div>}
            {!isError && <>
                <h1 className={styles.title}>Соберите бургер</h1>
                
                <div className={styles.tabs}>
                    <Tab 
                        value="bun" active={currentTab === 'bun'} 
                        onClick={() => handleScroll('bun')}
                    >
                        Булки
                    </Tab>
                    <Tab
                        value="sauce" active={currentTab === 'sauce'}
                        onClick={() => handleScroll('sauce')}
                    >
                        Соусы
                    </Tab>
                    <Tab 
                        value="main" active={currentTab === 'main'} 
                        onClick={() => handleScroll('main')}
                    >
                        Начинки
                    </Tab>
                </div>

                <div className={styles.ingredientsContainer}>
                    <div className={styles.section}>
                        <h2 className={styles.sectionTitle} ref={breadRef}>
                            Булки
                        </h2>
                        <div className={styles.ingredientsList}>
                            {categorizedIngredients.bun.map(ingredient => (
                                <div 
                                    key={ingredient._id} 
                                    className={styles.ingredientCard}
                                    onClick={
                                        () => handleIngredientClick(ingredient)
                                    }
                                >
                                    {getIngredientCount(ingredient) > 0 && (
                                        <Counter 
                                            count={
                                                getIngredientCount(ingredient)
                                            }
                                            size="default" 
                                        />
                                    )}
                                    <img 
                                        src={ingredient.image} 
                                        alt={ingredient.name}
                                        className={styles.ingredientImage}
                                    />
                                    <div className={styles.priceContainer}>
                                        <span className={styles.price}>
                                            {ingredient.price}
                                        </span>
                                        <CurrencyIcon type="primary" />
                                    </div>
                                    <p className={styles.ingredientName}>
                                        {ingredient.name}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className={styles.section}>
                        <h2 className={styles.sectionTitle} ref={sauceRef}>
                            Соусы
                        </h2>
                        <div className={styles.ingredientsList}>
                            {categorizedIngredients.sauce.map(ingredient => (
                                <div 
                                    key={ingredient._id} 
                                    className={styles.ingredientCard}
                                    onClick={
                                        () => handleIngredientClick(ingredient)
                                    }
                                >
                                    {getIngredientCount(ingredient) > 0 && (
                                        <Counter 
                                            count={
                                                getIngredientCount(ingredient)
                                            } 
                                            size="default" 
                                        />
                                    )}
                                    <img 
                                        src={ingredient.image} 
                                        alt={ingredient.name}
                                        className={styles.ingredientImage}
                                    />
                                    <div className={styles.priceContainer}>
                                    <span className={styles.price}>
                                        {ingredient.price}
                                    </span>
                                    <CurrencyIcon type="primary" />
                                    </div>
                                    <p className={styles.ingredientName}>
                                        {ingredient.name}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className={styles.section}>
                        <h2 className={styles.sectionTitle} ref={fillingRef}>
                            Начинки
                        </h2>
                        <div className={styles.ingredientsList}>
                            {categorizedIngredients.main.map(ingredient => (
                                <div 
                                    key={ingredient._id} 
                                    className={styles.ingredientCard}
                                    onClick={
                                        () => handleIngredientClick(ingredient)
                                    }
                                >
                                    {getIngredientCount(ingredient) > 0 && (
                                        <Counter 
                                            count={
                                                getIngredientCount(ingredient)
                                            }
                                            size="default"
                                        />
                                    )}
                                    <img 
                                        src={ingredient.image} 
                                        alt={ingredient.name}
                                        className={styles.ingredientImage}
                                    />
                                    <div className={styles.priceContainer}>
                                    <span className={styles.price}>
                                        {ingredient.price}
                                    </span>
                                    <CurrencyIcon type="primary" />
                                    </div>
                                    <p className={styles.ingredientName}>
                                        {ingredient.name}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </>}
        </div>
    )
}

export default BurgerIngredients
