import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './containers/App'

// Redux
import {
    createStore,
    applyMiddleware,
    combineReducers
} from 'redux'

// Redux Provider
import { Provider } from 'react-redux'

// Redux Thunk
import thunk from 'redux-thunk'

// Store reducers
import overviewReducer from 'store/reducers/overview'
import navigationReducer from 'store/reducers/navigation'

// Redux Devtools
import { composeWithDevTools } from 'redux-devtools-extension'

// Combining reducers into one
const rootReducer = combineReducers({
    overview: overviewReducer,
    navigation: navigationReducer
})

const store = createStore(rootReducer, composeWithDevTools(
    applyMiddleware(thunk)
))

const app = (
    <BrowserRouter>
        <Provider store={store}>
            <App />
        </Provider>
    </BrowserRouter>
)

ReactDOM.render(app, document.getElementById('root'))