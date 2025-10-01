import { useState } from 'react'

import AppHeader from './components/AppHeader/AppHeader'
import BurgerIngredients from 
    './components/BurgerIngredients/BurgerIngredients'
import BurgerConstructor from 
    './components/BurgerConstructor/BurgerConstructor'
import { Ingredient } from './types/ingredient'
import styles from './App.module.css'
import Modal from './components/Modal/Modal'
import { modalContentType } from './components/Modal/Modal.type'
import Order from './components/Order/Order'

function App() {
    const [
        constructorIngredients, setConstructorIngredients
    ] = useState<Ingredient[]>([])
    const [modalContent, setModalContent] = useState<modalContentType>({
        isModal: null,
        content: undefined
    })

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
        console.log(constructorIngredients)
        setModalContent({
            isModal: 'order',
            ingredients: constructorIngredients,
            content: <Order/>
        })
    }

    return (
        <div className={styles.App}>
            {modalContent && <Modal 
                modalContent={modalContent}
                setModalContent={setModalContent}
            >{modalContent.content}</ Modal>}
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
                    setModalContent={setModalContent}
                />
            </main>
        </div>
    )
}

export default App
