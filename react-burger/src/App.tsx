import {
    BrowserRouter as Router,
    Routes,
    Route,
    useLocation,
} from 'react-router-dom'
import { useEffect } from 'react'

import AppHeader from './components/AppHeader/AppHeader'
import ProtectedRoute from './components/ProtectedRoute'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import ForgotPasswordPage from './pages/ForgotPasswordPage'
import ResetPasswordPage from './pages/ResetPasswordPage'
import ProfilePage from './pages/ProfilePage'
import ProfileInfoPage from './pages/ProfileInfoPage'
import ProfileOrdersPage from './pages/ProfileOrdersPage'
import IngredientPage from './pages/IngredientPage'
import { getUser } from './services/actions/authActions'
import { getAccessToken } from './utils/auth'
import Modal from './components/Modal/Modal'
import IngredientDetails from './components/IngredientDetails/IngredientDetails'
import { useAppDispatch } from './hooks/reducerHook'
import { getIngredients } from './services/actions/ingredientActions'
import OrdersFeedPage from './pages/OrdersFeedPage'
import OrderDetailsPage from './pages/OrderDetailsPage'
import OrderInfoDetails from './components/OrderInfoDetails/OrderInfoDetails'

import styles from './App.module.css'

const AppRoutes = () => {
    const location = useLocation()
    const dispatch = useAppDispatch()
    const background = location.state?.background
    useEffect(() => {
        dispatch(getIngredients())
    }, [dispatch])

    return (
        <>
            <Routes location={background || location}>
                <Route path="/" element={<HomePage />} />
                <Route path="/ingredients/:id" element={<IngredientPage />} />
                <Route path="/feed" element={<OrdersFeedPage />} />
                <Route path="/feed/:id" element={<OrderDetailsPage />} />

                <Route
                    path="/login"
                    element={
                        <ProtectedRoute onlyUnauth>
                            <LoginPage />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/register"
                    element={
                        <ProtectedRoute onlyUnauth>
                            <RegisterPage />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/forgot-password"
                    element={
                        <ProtectedRoute onlyUnauth>
                            <ForgotPasswordPage />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/reset-password"
                    element={
                        <ProtectedRoute onlyUnauth>
                            <ResetPasswordPage />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/profile"
                    element={
                        <ProtectedRoute>
                            <ProfilePage />
                        </ProtectedRoute>
                    }
                >
                    <Route index element={<ProfileInfoPage />} />
                    <Route path="orders" element={<ProfileOrdersPage />} />
                </Route>
                <Route
                    path="/profile/orders/:id"
                    element={
                        <ProtectedRoute>
                            <OrderDetailsPage />
                        </ProtectedRoute>
                    }
                />
            </Routes>

            {background && (
                <Routes>
                    <Route
                        path="/ingredients/:id"
                        element={
                            <Modal title={'Детали ингредиента'}>
                                <IngredientDetails />
                            </Modal>
                        }
                    />
                    <Route
                        path="/feed/:id"
                        element={
                            <Modal>
                                <OrderInfoDetails />
                            </Modal>
                        }
                    />
                    <Route
                        path="/profile/orders/:id"
                        element={
                            <ProtectedRoute>
                                <Modal>
                                    <OrderInfoDetails />
                                </Modal>
                            </ProtectedRoute>
                        }
                    />
                </Routes>
            )}
        </>
    )
}

const App = () => {
    const dispatch = useAppDispatch()

    useEffect(() => {
        const token = getAccessToken()
        if (token) {
            dispatch(getUser() as any)
        }
    }, [dispatch])

    return (
        <Router>
            <div className={styles.App}>
                <AppHeader />
                <AppRoutes />
            </div>
        </Router>
    )
}

export default App
