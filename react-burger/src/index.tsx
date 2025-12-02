import React from 'react'
import ReactDOM from 'react-dom/client'
import { applyMiddleware, createStore, Reducer } from 'redux'
import { Provider } from 'react-redux'
import { thunk } from 'redux-thunk'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { composeWithDevTools } from 'redux-devtools-extension'

import App from './App'
import reportWebVitals from './reportWebVitals'
import { rootReducer } from './services/reducers/reducers'
import { socketMiddleware } from './services/middleware'

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
)

export const store = createStore(
    rootReducer as Reducer,
    composeWithDevTools(applyMiddleware(thunk, socketMiddleware))
)

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
