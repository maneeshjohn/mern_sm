import React, { Component } from 'react'
import { Provider } from 'react-redux'
import store from './redux/store/store'
import { BrowserRouter } from 'react-router-dom'

import Landing from './components/landing/Landing'

class App extends Component {
  render() {
    return (
      <Provider store={ store }>
        <BrowserRouter>
          <div className="App">            
            <Landing />
          </div>
        </BrowserRouter>
      </Provider>
    )
  }
}

export default App
