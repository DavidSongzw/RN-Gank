import React from 'react'
import PropTypes from 'prop-types'
import {
  Platform,
  ImageURISource,
  Image
} from 'react-native'

import BaseComponent from '../../components/base/baseComponent'
import ImageCache from '../../utils/imageCache'
const FILE_PREFIX = Platform.OS === 'ios' ? '' : 'file://'

class CacheImage extends BaseComponent {
  constructor (props) {
    super(props)
    this.displayName = 'CacheImage'
    this.state = { path: '' }
    this.uri = ''
    this.dispose = this.dispose.bind(this)
    this.observe = this.observe.bind(this)
    this.getProps = this.getProps.bind(this)
    this.checkSource = this.checkSource.bind(this)
    this.handler = this.handler.bind(this)
  }

  handler (path: string) {
    this.setState({ path })
  }

  dispose () {
    if (this.uri) {
      ImageCache.dispose(this.uri, this.handler)
    }
  }

  observe (source: ImageURISource) {
    if (source.uri !== this.uri) {
      this.dispose()
      this.uri = source.uri
      ImageCache.on(source, this.handler)
    }
  }

  getProps () {
    const props = this.props
    if (this.props.source && this.props.source.uri) {
      props['source'] = this.state.path ? {uri: FILE_PREFIX + this.state.path} : {}
    }
    return props
  }

  checkSource (source: ImageURISource) {
    if (Array.isArray(source)) {
      throw new Error(`不支持多张图片`)
    }
    return source
  }

  componentWillMount () {
    const source = this.checkSource(this.props.source)
    if (source.uri) {
      this.observe(source)
    }
  }

  componentWillReceiveProps (nextProps) {
    const source = this.checkSource(nextProps.source)
    if (source.uri) {
      this.observe(source)
    }
  }

  componentWillUnmount () {
    this.dispose()
  }

  render () {
    const props = this.getProps()
    console.log('cacheImage', props)
    return (<Image {...props} />)
  }
}

CacheImage.propTypes = {
  source: PropTypes.object.isRequired
}

export default CacheImage
