import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App.jsx'
import { Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import userReducer from './reducers/userReducer'
import history from './history'

import'bootstrap/dist/css/bootstrap.min.css'

const rootReducer = combineReducers({
    auth: userReducer
})

const store = createStore(rootReducer, {}, applyMiddleware(thunk))

ReactDOM.render(
    <Provider store={store}>
        <Router history={history}>
            <App />
        </Router>
    </Provider>,
    document.getElementById('root'))