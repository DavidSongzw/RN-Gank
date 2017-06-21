/**
 * 基类
 * [displayName description]
 * @type {String}
 */
import React, { Component } from 'react'
import {
  View
} from 'react-native'
class BaseComponent extends Component {
  constructor (props) {
    super(props)
    this.displayName = 'BaseComponent'
  }

  render () {
    return <View />
  }
}

export default BaseComponent
