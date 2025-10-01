import { useState } from 'react'

import AppHeader from './components/AppHeader/AppHeader'
import BurgerIngredients from 
    './components/BurgerIngredients/BurgerIngredients'
import BurgerConstructor from 
    './components/BurgerConstructor/BurgerConstructor'
import { Ingredient } from './types/ingredient'
import styles from './App.module.css'

function App() {
    const [
        constructorIngredients, setConstructorIngredients
    ] = useState<Ingredient[]>([])

    const handleIngredientClick = (ingredient: Ingredient) => {
        if (ingredient.type === 'bun') {
            setConstructorIngredients(prev => 
                prev.filter(item => item.type !== 'bun').concat(ingredient)
            )
        } else {
            setConstructorIngredients(prev => [...prev, ingredient])
        }
    }

    const handleRemoveIngredient = (index: number) => {
        setConstructorIngredients(prev => {
            const newIngredients = [...prev]
            const actualIndex = newIngredients.findIndex((item, i) => 
                item.type !== 'bun' && 
                newIngredients.filter((ing, idx) => idx < i
                    && ing.type !== 'bun').length === index
            )
            if (actualIndex !== -1) {
                newIngredients.splice(actualIndex, 1)
            }
            return newIngredients
        })
    }

    const handleOrderClick = () => {
        alert('Заказ оформлен! (демо-версия)')
        setConstructorIngredients([])
    }

    return (
        <div className={styles.App}>
            <AppHeader />
            <main className={styles.mainContent}>
                <BurgerIngredients 
                    onIngredientClick={handleIngredientClick}
                    constructorIngredients={constructorIngredients}
                />
                <BurgerConstructor 
                    ingredients={constructorIngredients}
                    onRemoveIngredient={handleRemoveIngredient}
                    onOrderClick={handleOrderClick}
                />
            </main>
        </div>
    )
}

export default App
