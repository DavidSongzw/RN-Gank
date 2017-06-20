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
    flexDirection: 'row',
    width: Screen.scaleSizeW(750),
    height: Screen.scaleSizeW(240),
    paddingHorizontal: Screen.scaleSizeW(30),
    paddingVertical: Screen.scaleSizeW(40),
    justifyContent: 'space-between'
  },
  viewItemLeft: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  textItemTitle: {
    fontSize: Screen.setSpText(36),
    color: '#111'
    // textAlign: 'center'
  },
  textItemBottom: {
    fontSize: Screen.setSpText(30),
    color: '#666'
  },
  img: {
    height: Screen.scaleSizeW(160),
    width: Screen.scaleSizeW(160)
  }
})

class ItemCell extends Component {
  constructor (props) {
    super(props)
    this.displayName = 'ItemCell'
  }

  render () {
    const {
      data,
      clickFunc
    } = this.props
    const item = data.item
    let imageView
    if (item.images && item.images.size) {
      imageView = (
        <MImage
          style={styles.img}
          source={{uri: item.images.get(0), w: 200, h: 200}}
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
          <View style={styles.viewItemLeft}>
            <Text
              style={styles.textItemTitle}
              numberOfLines={2}
            >
              {item.desc}
            </Text>
            <Text style={styles.textItemBottom}>
              {who}
              {item.publishedAt}
            </Text>
          </View>
          {imageView}
        </View>
      </TouchableOpacity>
    )
  }
}

ItemCell.propTypes = {
  clickFunc: React.PropTypes.func,
  data: React.PropTypes.object
}

export default ItemCell
