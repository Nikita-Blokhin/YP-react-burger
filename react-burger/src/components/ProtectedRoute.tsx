import type React from 'react'
import { useEffect } from 'react'
import { Navigate, useLocation } from 'react-router-dom'

import { getUser } from '../services/authActions'
import { useAppDispatch, useAppSelector } from '../hooks/reducerHook'
import { getAccessToken } from '../utils/auth'

interface ProtectedRouteProps {
    children: React.ReactNode
    onlyUnauth?: boolean
}

const ProtectedRoute = ({
    children,
    onlyUnauth = false,
}: ProtectedRouteProps) => {
    const dispatch = useAppDispatch()
    const location = useLocation()
    const { isAuthenticated, isLoading } = useAppSelector(
        (state) => state.auth
    )
    const hasToken = getAccessToken()

    useEffect(() => {
        if (hasToken && !isAuthenticated && !isLoading) {
            dispatch(getUser() as any)
        }
    }, [dispatch, hasToken, isAuthenticated, isLoading])

    if (isLoading || (hasToken && !isAuthenticated)) {
        return (
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    minHeight: 'calc(100vh - 88px)',
                    fontSize: '18px',
                    color: '#8585ad',
                }}
            >
                Загрузка...
            </div>
        )
    }

    if (onlyUnauth && isAuthenticated) {
        const from = location.state?.from?.pathname || '/'
        return <Navigate to={from} replace />
    }

    if (!onlyUnauth && !isAuthenticated) {
        return <Navigate to="/login" state={{ from: location }} replace />
    }

    return <>{children}</>
}

export default ProtectedRoute
