import { Component } from 'react'

class BaseComponent extends Component {
  constructor (props) {
    super(props)
    this.displayName = 'BaseComponent'
  }

  render () {
    return null
  }
}

export default BaseComponent
