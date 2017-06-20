import React, { Component } from 'react'
import { Provider } from 'react-redux'
import configureStore from './store/configureStore'
import App from './navigator/appNav'

class Index extends Component {
  store = configureStore({})

  render () {
    return (
      <Provider store={this.store}>
        <App />
      </Provider>
    )
  }
}

export default Index
