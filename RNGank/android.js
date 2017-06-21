import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  View,
  FlatList,
  Text
} from 'react-native'
import * as AndroidAction from '../../actions/android'
import Screen from '../../utils/screenUtils'
// import Pages from '../../constants/pages'
import { callApi, pushWap } from '../../actions/app'
import StyleSheet from '../../utils/mStyleSheet'
import ItemCell from '../../components/common/itemCell'

const styles = StyleSheet.create({
  separator: {
    height: Screen.scaleSizeH(2),
    backgroundColor: '#DDD',
    marginHorizontal: 10
  },
  footer: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  textFooter: {
    textAlign: 'center'
  }
})

class Android extends Component {
  constructor (props) {
    super(props)
    this.page = 1
    this.state = {
      refreshing: false,
      loading: false
    }
    this.displayName = 'Android'
    this.goNext = this.goNext.bind(this)
    this.getAndroidData = this.getAndroidData.bind(this)
    this.renderAndroidItem = this.renderAndroidItem.bind(this)
    this.onRefresh = this.onRefresh.bind(this)
    this.loadMore = this.loadMore.bind(this)
    this.renderFooter = this.renderFooter.bind(this)
    this.renderSeparator = this.renderSeparator.bind(this)
  }
  static navigationOptions = {
    tabBarLabel: 'Android',
    title: 'Android'
  }

  componentDidMount () {
    this.getAndroidData(this.page)
  }

  getAndroidData (page, done) {
    const { getAndroidData } = this.props
    getAndroidData(page, done)
  }

  onRefresh () {
    const {refreshing, loading} = this.state
    if (refreshing || loading) {
      return
    }
    this.setState({
      refreshing: true,
      loading: false
    })
    this.getAndroidData(this.page = 1, () => {
      this.setState({
        refreshing: false
      })
    })
  }
  loadMore () {
    const {refreshing, loading} = this.state
    if (refreshing || loading) {
      return
    }
    this.setState({
      refreshing: false,
      loading: true
    })
    this.getAndroidData(this.page = this.page + 1, () => {
      this.setState({
        loading: false
      })
    })
  }

  renderAndroidItem (info) {
    return (
      <ItemCell
        data={info}
        clickFunc={() => this.goNext(info.index)}
        />
    )
  }

  renderSeparator () {
    return (
      <View style={styles.separator} />
    )
  }

  renderFooter () {
    return (
      <View style={styles.footer}>
        <Text style={styles.textFooter}>
          加载中...
        </Text>
      </View>
    )
  }

  goNext (index) {
    const { dispatch, androidList } = this.props
    console.log('androidList', androidList.get(index))
    dispatch(pushWap(androidList.get(index)))
  }

  render () {
    const { androidList } = this.props
    console.log('androidData', androidList.toJS(), androidList.size)
    let listView
    if (androidList && androidList.size) {
      listView = (
        <FlatList
          ItemSeparatorComponent={this.renderSeparator}
          ListFooterComponent={this.renderFooter}
          data={androidList.toArray()}
          renderItem={this.renderAndroidItem}
          keyExtractor={(item, index) => index}
          onRefresh={this.onRefresh}
          refreshing={this.state.refreshing}
          onEndReachedThreshold={0.1}
          onEndReached={this.loadMore}
        />
      )
    }
    return (
      <View>
        {listView}
      </View>
    )
  }
}
function mapStateToProps (state) {
  const { android } = state
  return {
    androidList: android.get('androidList')
  }
}

function mapDispatchToProps (dispatch) {
  return {
    getAndroidData: (page, done) => dispatch(
      callApi({
        api: `/data/Android/10/${page}`,
        success: (response) => dispatch(
          AndroidAction.androidUpdate(response, page)
        ),
        method: 'GET',
        done
      })
    ),
    dispatch
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Android)
