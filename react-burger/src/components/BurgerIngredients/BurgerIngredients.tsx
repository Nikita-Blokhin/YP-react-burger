import { useState, useMemo, useRef, useEffect } from 'react'
import { 
    Tab, Button 
} from '@ya.praktikum/react-developer-burger-ui-components'

import { Ingredient } from '../../types/Ingredient'
import { 
    getIngredients, 
    MODAL_OPEN_INGREDIENT
} from '../../services/actions'
import IngredientDetails from '../IngredientDetails/IngredientDetails'
import IngredientCard from './IngredientCard'
import { useAppDispatch, useAppSelector } from '../../hooks/reducerHook'

import styles from './BurgerIngredients.module.css'

const BurgerIngredients = () => {

    const dispatch = useAppDispatch()
    
    const isModal = useAppSelector(state => state.isModalDetail)
    const ingredients = useAppSelector(state => state.ingredients)
    const isError = useAppSelector(state => state.ingredientsFailed)
    const constructorIngredients = useAppSelector(
        state => state.ingredientsConstructor
    )

    const [currentTab, setCurrentTab] = useState<string>('bun')
    const [isLoading, setLoading] = useState(false)

    const containerRef = useRef<HTMLDivElement>(null)
    const breadRef = useRef<HTMLDivElement>(null)
    const sauceRef = useRef<HTMLDivElement>(null)
    const fillingRef = useRef<HTMLDivElement>(null)

    const getData = async () => {
        dispatch(getIngredients())
        setLoading(false)
    }

    useEffect(() => {
        setLoading(true)
        getData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        const container = containerRef.current
        if (!container || isLoading) return

        const observerOptions = {
            root: container,
            rootMargin: '0px 0px -90% 0px',
            threshold: 0,
        }

        const observerCallback = (entries: IntersectionObserverEntry[]) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const sectionId = entry.target.getAttribute('data-section')
                if (sectionId) {
                    setCurrentTab(sectionId)
                }
                }
            })
        }

        const observer = new IntersectionObserver(
            observerCallback, observerOptions
        )

        if (breadRef.current) observer.observe(breadRef.current)
        if (sauceRef.current) observer.observe(sauceRef.current)
        if (fillingRef.current) observer.observe(fillingRef.current)

        return () => observer.disconnect()
    }, [isLoading])

    const categorizedIngredients = useMemo(() => ({
        bun: ingredients.filter
            ((item: Ingredient) => item.type === 'bun') as Ingredient[],
        sauce: ingredients.filter
            ((item: Ingredient) => item.type === 'sauce') as Ingredient[],
        main: ingredients.filter
            ((item: Ingredient) => item.type === 'main') as Ingredient[]
    }), [ingredients])
    
    const getIngredientCount = (ingredient: Ingredient): number => {
        return ingredient.type === 'bun' 
            ? constructorIngredients
                .filter(item => item._id === ingredient._id).length * 2
            : constructorIngredients
                .filter(item => item._id === ingredient._id).length
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
            {isModal &&  <IngredientDetails />}
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
                    className={styles.ingredientsContainer} ref={containerRef}
                >
                    <div className={styles.section}>
                        <h2 
                            className={styles.sectionTitle} ref={breadRef}
                            data-section='bun'
                        >
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
                        <h2 
                            className={styles.sectionTitle} ref={sauceRef}
                            data-section='sauce'
                        >
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
                        <h2 
                            className={styles.sectionTitle} ref={fillingRef}
                            data-section='main'
                        >
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
