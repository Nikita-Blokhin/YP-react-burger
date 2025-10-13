import AppHeader from './components/AppHeader/AppHeader'
import BurgerIngredients from 
    './components/BurgerIngredients/BurgerIngredients'
import BurgerConstructor from 
    './components/BurgerConstructor/BurgerConstructor'
    
import styles from './App.module.css'


function App() {

    return (
        <div className={styles.App}>
            <AppHeader />
            <main className={styles.mainContent}>
                <BurgerIngredients />
                <BurgerConstructor />
            </main>
        </div>
    )
}

export default App
