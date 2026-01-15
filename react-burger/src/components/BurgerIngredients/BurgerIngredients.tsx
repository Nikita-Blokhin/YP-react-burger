import { useState, useMemo, useRef, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'

import type { IIngredient } from '../../types/Ingredient'
import { MODAL_OPEN_INGREDIENT } from '../../services/actions/modalActions'
import IngredientCard from './IngredientCard'
import { useAppDispatch, useAppSelector } from '../../hooks/reducerHook'

import styles from './BurgerIngredients.module.css'

const BurgerIngredients = () => {
    const dispatch = useAppDispatch()
    const isLoading = useAppSelector(
        (state) => state.ingredients.ingredientsRequest
    )
    const navigate = useNavigate()
    const location = useLocation()

    const ingredients = useAppSelector(
        (state) => state.ingredients.ingredients
    )
    const isError = useAppSelector(
        (state) => state.ingredients.ingredientsFailed
    )
    const constructorIngredients = useAppSelector(
        (state) => state.burgerConstructor.ingredientsConstructor
    )

    const [currentTab, setCurrentTab] = useState<string>('bun')

    const containerRef = useRef<HTMLDivElement>(null)
    const breadRef = useRef<HTMLDivElement>(null)
    const sauceRef = useRef<HTMLDivElement>(null)
    const fillingRef = useRef<HTMLDivElement>(null)

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
            observerCallback,
            observerOptions
        )

        if (breadRef.current) observer.observe(breadRef.current)
        if (sauceRef.current) observer.observe(sauceRef.current)
        if (fillingRef.current) observer.observe(fillingRef.current)

        return () => observer.disconnect()
    }, [isLoading])

    const categorizedIngredients = useMemo(
        () => ({
            bun: ingredients.filter(
                (item: IIngredient) => item.type === 'bun'
            ) as IIngredient[],
            sauce: ingredients.filter(
                (item: IIngredient) => item.type === 'sauce'
            ) as IIngredient[],
            main: ingredients.filter(
                (item: IIngredient) => item.type === 'main'
            ) as IIngredient[],
        }),
        [ingredients]
    )

    const getIngredientCount = (ingredient: IIngredient): number => {
        return ingredient.type === 'bun'
            ? constructorIngredients?.filter(
                  (item) => item._id === ingredient._id
              ).length * 2
            : constructorIngredients?.filter(
                  (item) => item._id === ingredient._id
              ).length
    }

    const handleIngredientClick = (ingredient: IIngredient) => {
        dispatch({ type: MODAL_OPEN_INGREDIENT, ingredientDetail: ingredient })
        navigate(`/ingredients/${ingredient._id}`, {
            state: { background: location },
        })
    }

    const handleScroll = (theme: 'bun' | 'sauce' | 'main') => {
        if (theme === 'bun') {
            if (breadRef.current) {
                breadRef.current.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start',
                })
                setCurrentTab('bun')
            }
        } else if (theme === 'sauce') {
            if (sauceRef.current) {
                sauceRef.current.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start',
                })
                setCurrentTab('sauce')
            }
        } else {
            if (fillingRef.current) {
                fillingRef.current.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start',
                })
                setCurrentTab('main')
            }
        }
    }

    return (
        <div className={styles.container}>
            {!isError && (
                <>
                    <h1 className={styles.title}>Соберите бургер</h1>

                    <div className={styles.tabs}>
                        <Tab
                            value="bun"
                            active={currentTab === 'bun'}
                            onClick={() => handleScroll('bun')}
                        >
                            Булки
                        </Tab>
                        <Tab
                            value="sauce"
                            active={currentTab === 'sauce'}
                            onClick={() => handleScroll('sauce')}
                        >
                            Соусы
                        </Tab>
                        <Tab
                            value="main"
                            active={currentTab === 'main'}
                            onClick={() => handleScroll('main')}
                        >
                            Начинки
                        </Tab>
                    </div>

                    {isLoading ? (
                        <h2>Загрузка...</h2>
                    ) : (
                        <div
                            className={styles.ingredientsContainer}
                            ref={containerRef}
                        >
                            <div className={styles.section}>
                                <h2
                                    className={styles.sectionTitle}
                                    ref={breadRef}
                                    data-section="bun"
                                >
                                    Булки
                                </h2>
                                <div className={styles.ingredientsList}>
                                    {categorizedIngredients.bun.map(
                                        (ingredient) => (
                                            <IngredientCard
                                                key={ingredient._id}
                                                ingredient={ingredient}
                                                onClick={() =>
                                                    handleIngredientClick(
                                                        ingredient
                                                    )
                                                }
                                                getIngredientCount={
                                                    getIngredientCount
                                                }
                                            />
                                        )
                                    )}
                                </div>
                            </div>

                            <div className={styles.section}>
                                <h2
                                    className={styles.sectionTitle}
                                    ref={sauceRef}
                                    data-section="sauce"
                                >
                                    Соусы
                                </h2>
                                <div className={styles.ingredientsList}>
                                    {categorizedIngredients.sauce.map(
                                        (ingredient) => (
                                            <IngredientCard
                                                key={ingredient._id}
                                                ingredient={ingredient}
                                                onClick={() =>
                                                    handleIngredientClick(
                                                        ingredient
                                                    )
                                                }
                                                getIngredientCount={
                                                    getIngredientCount
                                                }
                                            />
                                        )
                                    )}
                                </div>
                            </div>

                            <div className={styles.section}>
                                <h2
                                    className={styles.sectionTitle}
                                    ref={fillingRef}
                                    data-section="main"
                                >
                                    Начинки
                                </h2>
                                <div className={styles.ingredientsList}>
                                    {categorizedIngredients.main.map(
                                        (ingredient) => (
                                            <IngredientCard
                                                key={ingredient._id}
                                                ingredient={ingredient}
                                                onClick={() =>
                                                    handleIngredientClick(
                                                        ingredient
                                                    )
                                                }
                                                getIngredientCount={
                                                    getIngredientCount
                                                }
                                            />
                                        )
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                </>
            )}
        </div>
    )
}

export default BurgerIngredients
