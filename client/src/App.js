import React, { Component } from 'react'
import { Provider } from 'react-redux'
import store from './redux/store/store'
import { BrowserRouter } from 'react-router-dom'

class App extends Component {
  render() {
    return (
      <Provider store={ store }>
        <BrowserRouter>
          <div className="App">
            <h1>React</h1>
          </div>
        </BrowserRouter>
      </Provider>
    )
  }
}

export default App
