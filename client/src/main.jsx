import React from 'react'
import { Provider } from 'react-redux'
import { createStore } from "redux";
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ReactDOM from 'react-dom'
import Login from './components/Login.jsx'
import BaseLayout from './components/BaseLayout.jsx'
import Register from './components/Register.jsx'
import reducer from './store/reducer.js'
import './index.css'
import ProtectedRoute from './components/ProtectedRoute'

const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

const token = localStorage.getItem('jwtToken')
if (token) {
  store.dispatch({ type: 'ON_LOGIN', payload: token })
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ProtectedRoute> <BaseLayout /></ProtectedRoute>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
)