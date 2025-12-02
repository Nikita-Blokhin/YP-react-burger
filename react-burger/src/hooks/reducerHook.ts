import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

import { IState } from '../types/Services'
import { store } from '..'

export type AppStore = typeof store
export type AppDispatch = AppStore['dispatch']
export const useAppSelector: TypedUseSelectorHook<IState> = useSelector
export const useAppDispatch = () => useDispatch<AppDispatch>()
