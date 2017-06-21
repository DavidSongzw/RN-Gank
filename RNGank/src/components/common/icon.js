import React, { Component } from 'react'
import {
  Text
} from 'react-native'
import PropTypes from 'prop-types'
import StyleSheet from '../../utils/mStyleSheet'

const styles = StyleSheet.create({
  container: {
    fontFamily: 'iconfont',
    fontWeight: 'normal'
  }
})

class Icon extends Component {
  constructor (props) {
    super(props)
    this.displayName = 'Icon'
  }

  render () {
    const {
      style,
      icon,
      ...others
    } = this.props
    return (
      <Text
        style={[
          styles.container,
          style
        ]}
        {...others}
      >
        {icon}
      </Text>
    )
  }
}

Icon.propTypes = {
  ...Text.propTypes,
  icon: PropTypes.string
}

export default Icon
