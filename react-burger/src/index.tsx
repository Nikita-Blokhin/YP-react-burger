import React from 'react'
import ReactDOM from 'react-dom/client'
import { compose, createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { thunk } from 'redux-thunk'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

import App from './App'
import reportWebVitals from './reportWebVitals'
import { rootReducer } from './services/reducers'

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
)

const composeEnhancers =
    typeof window === 'object' && (window as any)
        .__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
        ? (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
        : compose

const store = createStore(rootReducer,
    composeEnhancers(applyMiddleware(thunk))
)

root.render(
    <React.StrictMode>
        <DndProvider backend={HTML5Backend}>
            <Provider store={store}>
                <App />
            </Provider>
        </DndProvider>
    </React.StrictMode>
)

reportWebVitals()
