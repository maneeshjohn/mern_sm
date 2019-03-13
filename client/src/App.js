import React, { Component } from 'react'
import { Provider } from 'react-redux'
import store from './redux/store/store'
import { BrowserRouter, Route } from 'react-router-dom'
import setAuthToken from './utils/setAuthToken'
import { setUser, logoutUser } from './redux/actions/authActions'
import { clearProfile } from './redux/actions/profileActions'
import jwt_decode from 'jwt-decode'

import Navigation from './components/layout/Navigation'
import Landing from './components/layout/Landing'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import Dashboard from './components/dashboard/Dashboard'
import Footer from './components/layout/Footer'

const token = localStorage.jwtToken
if(token){
  setAuthToken(token)
  const user = jwt_decode(token)
  store.dispatch(setUser(user))
  const now = (Date.now() / 1000)

  if(user.exp < now){  
  store.dispatch(logoutUser())
  store.dispatch(clearProfile())
  window.location.href = '/login'
}
}

class App extends Component {
  render() {
    return (
      <Provider store={ store }>
        <BrowserRouter>
          <div className="App">
            <Navigation />
            <Route exact path="/" component={ Landing } />
            <Route exact path="/login" component={ Login } />
            <Route exact path="/register" component={ Register } />
            <Route exact path="/dashboard" component={ Dashboard } />
            <Footer />
          </div>
        </BrowserRouter>
      </Provider>
    )
  }
}

export default App