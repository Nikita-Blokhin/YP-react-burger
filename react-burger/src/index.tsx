import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { configureStore } from '@reduxjs/toolkit'

import App from './App'
import reportWebVitals from './reportWebVitals'
import { rootReducer } from './services/reducers/reducers'
import { socketMiddleware } from './services/middleware'
import { WSStoreActions } from './services/actions/wsAction'

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
)

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(socketMiddleware(WSStoreActions)),
})

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <DndProvider backend={HTML5Backend}>
                <App />
            </DndProvider>
        </Provider>
    </React.StrictMode>
)

reportWebVitals()
