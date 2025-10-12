import { useState } from 'react'

import AppHeader from './components/AppHeader/AppHeader'
import BurgerIngredients from 
    './components/BurgerIngredients/BurgerIngredients'
import BurgerConstructor from 
    './components/BurgerConstructor/BurgerConstructor'
import { Ingredient } from './types/Ingredient'
import styles from './App.module.css'

function App() {
    
    const [
        constructorIngredients, setConstructorIngredients
    ] = useState<Ingredient[]>([])

    // const handleIngredientClick = (ingredient: Ingredient) => {
    //     if (ingredient.type === 'bun') {
    //         setConstructorIngredients(prev => 
    //             prev.filter(item => item.type !== 'bun').concat(ingredient)
    //         )
    //     } else {
    //         setConstructorIngredients(prev => [...prev, ingredient])
    //     }
    // }

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
        
    }

    const handleDropIngredient = (ingredient: Ingredient) => {
    if (ingredient.type === "bun") {
      // Replace existing bun with new one
      setConstructorIngredients((prev) => prev.filter((item) => item.type !== "bun").concat(ingredient))
    } else {
      // Add sauce or main ingredient
      setConstructorIngredients((prev) => [...prev, ingredient])
    }
  }

    return (
        <div className={styles.App}>
            <AppHeader />
            <main className={styles.mainContent}>
                <BurgerIngredients 
                    constructorIngredients={constructorIngredients}
                />
                <BurgerConstructor 
                    ingredients={constructorIngredients}
                    onRemoveIngredient={handleRemoveIngredient}
                    onOrderClick={handleOrderClick}
                    onDropIngredient={handleDropIngredient}
                />
            </main>
        </div>
    )
}

export default App
