import BurgerIngredients from '../components/BurgerIngredients/BurgerIngredients'
import BurgerConstructor from '../components/BurgerConstructor/BurgerConstructor'

import styles from '../App.module.css'

const HomePage = () => {
    return (
        <main className={styles.mainContent}>
            <BurgerIngredients />
            <BurgerConstructor />
        </main>
    )
}

export default HomePage
