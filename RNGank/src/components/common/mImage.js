import React, { Component } from 'react'
import {
  Image,
  TouchableHighlight,
  StyleSheet,
  View,
  Text
} from 'react-native'

import {
  getFullPath
} from '../../utils/image'
import PropTypes from 'prop-types'
const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    // position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0
  },
  img: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
    zIndex: 4
  },
  err: {
    zIndex: 3,
    position: 'absolute',
    color: '#DDD',
    fontSize: 20,
    fontFamily: 'iconfont',
    textAlign: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    left: 0,
    right: 0
  },
  loading: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

class MImage extends Component {
  constructor (props) {
    super(props)
    this.displayName = 'MImage'
    this.state = {
      loaded: false,
      error: false
    }
    this.loadDone = this.loadDone.bind(this)
    this.error = this.error.bind(this)
    this.getRealPath = this.getRealPath.bind(this)
    this.getRealPath(props)
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.source.uri !== this.props.source.uri) {
      this.getRealPath(nextProps)
      this.setState({
        loaded: false,
        error: false
      })
    }
  }

  getRealPath (props) {
    const {
      source
    } = props
// getFullPath ({path, w, h})
    if (source.uri && source.w && source.h) {
      this.realSource = {
        uri: getFullPath({
          path: source.uri,
          w: source.w,
          h: source.h
        })
      }
    } else {
      this.realSource = source
    }
  }

  loadDone () {
    this.setState({
      loaded: true
    })
  }

  error (e) {
    console.log('load pic error', this.realSource, e)
    this.setState({
      error: true,
      loaded: false
    })
  }

  render () {
    const {
      clickFunc,
      style,
      source,
      ...others
    } = this.props

    const {
      loaded,
      error
    } = this.state

    return (
      <View
        style={[
          styles.container,
          style
        ]}
      >
        {(() => {
          if (!error) {
            return (
              <TouchableHighlight
                onPress={clickFunc}
                style={[
                  styles.container,
                  style
                ]}
              >
                <Image
                  {...others}
                  style={[
                    styles.img,
                    {
                      opacity: loaded ? 1 : 0
                    }
                  ]}
                  source={this.realSource}
                  onLoad={this.loadDone}
                  onError={this.error}
                />
              </TouchableHighlight>
            )
          }
        })()}
        {(() => {
          if (error || !loaded) {
            let view
            if (!error) {
              view = (
                <View style={[styles.loading, {backgroundColor: '#DDDDDD'}]} />
              )
            } else if (error) {
              view = (
                <View style={styles.loading}>
                  <Text
                    style={[
                      styles.err,
                      {fontSize: source.w / 2}
                    ]}
                  >
                  &#xe618;
                  </Text>
                </View>
              )
            }
            return view
          }
        })()}
      </View>
    )
  }
}

MImage.propTypes = {
  ...Image.propTypes,
  clickFunc: PropTypes.func
}

export default MImage
