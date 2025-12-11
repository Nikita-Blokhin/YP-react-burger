import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

import { store } from '..'

export type AppStore = typeof store

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export const useAppDispatch = () => useDispatch<AppDispatch>()
