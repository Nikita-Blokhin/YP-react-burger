import { useState } from 'react'

import AppHeader from './components/AppHeader/AppHeader'
import BurgerIngredients from 
    './components/BurgerIngredients/BurgerIngredients'
import BurgerConstructor from 
    './components/BurgerConstructor/BurgerConstructor'
import { Ingredient } from './types/Ingredient'
import styles from './App.module.css'
import Modal from './components/Modal/Modal'
import { ModalContentType } from './types/Modal'
import OrderDetails from './components/OrderDetails/OrderDetails'
import IngredientDetails from './components/IngredientDetails/IngredientDetails'

function App() {
    
    const [
        constructorIngredients, setConstructorIngredients
    ] = useState<Ingredient[]>([])
    const [modalContent, setModalContent] = useState<ModalContentType>({
        isModal: null,
        content: undefined,
        ingredient: null
    })

    const handleIngredientClick = (ingredient: Ingredient) => {
        setModalContent({
            isModal: 'ingredient',
            content: <IngredientDetails 
                ingredient={ingredient}
            />
        })
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
        setModalContent({
            isModal: 'order',
            ingredients: constructorIngredients,
            content: <OrderDetails/>
        })
    }

    return (
        <div className={styles.App}>
            {modalContent.isModal && <Modal 
                modalContent={modalContent}
                setModalContent={setModalContent}
                title={ modalContent.isModal === 'ingredient'
                    ? 'Детали ингредиента'
                    : ''
                }
            >{modalContent.content}</Modal>}
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
