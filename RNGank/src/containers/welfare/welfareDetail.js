import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  View
} from 'react-native'
import StyleSheet from '../../utils/mStyleSheet'
import MImage from '../../components/common/mImage'

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0
  },
  img: {
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0
  }
})

class WelfareDetail extends Component {
  constructor (props) {
    super(props)
    this.displayName = 'WelfareDetail'
  }
  static navigationOptions = ({ navigation }) => ({
    title: `${navigation.state.params.desc}  福利`
  })
  render () {
    const { navigation } = this.props
    console.log('navigation.state.params', navigation.state.params)
    return (
      <View style={styles.container}>
        <MImage
          source={{uri: navigation.state.params.url}}
          style={styles.img}
          />
      </View>
    )
  }
}
function mapStateToProps (state) {
  const { android } = state
  return {
    android
  }
}

function mapDispatchToProps (dispatch) {
  return {
    dispatch
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(WelfareDetail)
