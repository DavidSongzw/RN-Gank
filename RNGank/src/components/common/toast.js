import React, { Component } from 'react'
import {
  Text,
  View,
  StyleSheet
} from 'react-native'
import PropTypes from 'prop-types'
import {
  valueBettween
} from '../../utils/func'

import Icon from './icon'

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000000a0',
    padding: 10,
    alignSelf: 'center',
    marginRight: 20,
    marginLeft: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
    borderRadius: 5
  },
  success: {
    color: 'green',
    fontSize: 15,
    marginRight: 10
  },
  info: {
    color: 'yellow',
    fontSize: 15,
    marginRight: 10
  },
  error: {
    color: 'red',
    fontSize: 15,
    marginRight: 10
  },
  text: {
    color: 'white',
    fontSize: 12
  }
})

class Toast extends Component {
  constructor (props) {
    super(props)
    this.displayName = 'Toast'
  }

  render () {
    const { text, type } = this.props
    console.log('==text=', text)
    const width = valueBettween({
      max: 200,
      min: 50,
      value: text ? text.length * 12 : 0
    })

    return (
      <View
        style={styles.container}
      >
        {(() => {
          let icon
          switch (type) {
            case 'success':
              icon = (<Icon icon='&#xe61b;' style={styles.success} />)
              break
            case 'info':
              icon = (<Icon icon='&#xe61c;' style={styles.info} />)
              break
            case 'error':
              icon = (<Icon icon='&#xe663;' style={styles.error} />)
              break
            default:
              icon = (<Icon icon='&#xe61c;' style={styles.info} />)
          }
          return icon
        })()}
        <Text
          style={[
            styles.text,
            {
              width
            }
          ]}
          numberOfLines={0}
        >
          {text}
        </Text>
      </View>
    )
  }
}

Toast.propTypes = {
  text: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['success', 'info', 'error']).isRequired
}

export default Toast
