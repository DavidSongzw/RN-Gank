import React, { Component } from 'react'
import {
  TouchableOpacity,
  View,
  Text
} from 'react-native'
import MImage from './mImage'
import StyleSheet from '../../utils/mStyleSheet'
import Screen from '../../utils/screenUtils'
const styles = StyleSheet.create({
  viewItem: {
    width: Screen.scaleSizeW(375),
    height: Screen.scaleSizeW(450),
    // paddingHorizontal: Screen.scaleSizeW(30),
    // paddingVertical: Screen.scaleSizeW(40),
    justifyContent: 'space-between',
    backgroundColor: 'white',
    margin: Screen.scaleSizeW(5)
  },
  textItemBottom: {
    fontSize: Screen.setSpText(30),
    color: '#666'
  },
  img: {
    width: Screen.scaleSizeW(375),
    height: Screen.scaleSizeW(400)
  }
})

class ImageItemCell extends Component {
  constructor (props) {
    super(props)
    this.displayName = 'ImageItemCell'
  }

  render () {
    const {
      data,
      clickFunc
    } = this.props
    const item = data.item
    let imageView
    if (item.url) {
      imageView = (
        <MImage
          style={styles.img}
          source={{uri: item.url, w: 200, h: 200}}
          clickFunc={clickFunc}
        />
        )
    }
    let who = item.who ? `${item.who}-` : ''
    return (
      <TouchableOpacity
        onPress={clickFunc}
      >
        <View
          style={styles.viewItem}
        >
          {imageView}
          <Text style={styles.textItemBottom}>
            {who}{item.desc}
          </Text>
        </View>
      </TouchableOpacity>
    )
  }
}

ImageItemCell.propTypes = {
  clickFunc: React.PropTypes.func,
  data: React.PropTypes.object
}

export default ImageItemCell
