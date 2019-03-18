import React, { Component } from 'react'
import { Provider } from 'react-redux'
import store from './redux/store/store'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import setAuthToken from './utils/setAuthToken'
import { setUser, logoutUser } from './redux/actions/authActions'
import { clearProfile } from './redux/actions/profileActions'
import jwt_decode from 'jwt-decode'

import AuthRoute from './components/common/AuthRoute'
import Navigation from './components/layout/Navigation'
import Landing from './components/layout/Landing'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import Dashboard from './components/dashboard/Dashboard'
import ProfileDetails from './components/dashboard/ProfileDetails'
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
            <Switch>
              <AuthRoute exact path="/dashboard" component={ Dashboard } />
            </Switch>
            <Switch>
              <AuthRoute exact path="/dashboard/profile" component={ ProfileDetails } />
            </Switch>
            <Footer />
          </div>
        </BrowserRouter>
      </Provider>
    )
  }
}

export default App