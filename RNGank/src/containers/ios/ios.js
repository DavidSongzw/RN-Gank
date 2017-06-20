import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  View,
  FlatList,
  Text
} from 'react-native'
import * as iOSAction from '../../actions/ios'
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

class iOS extends Component {
  constructor (props) {
    super(props)
    this.page = 1
    this.state = {
      refreshing: false,
      loading: false
    }
    this.displayName = 'iOS'
    this.goNext = this.goNext.bind(this)
    this.getiOSData = this.getiOSData.bind(this)
    this.renderiOSItem = this.renderiOSItem.bind(this)
    this.onRefresh = this.onRefresh.bind(this)
    this.loadMore = this.loadMore.bind(this)
    this.renderFooter = this.renderFooter.bind(this)
    this.renderSeparator = this.renderSeparator.bind(this)
  }
  static navigationOptions = {
    tabBarLabel: 'iOS',
    title: 'iOS'
  }

  componentDidMount () {
    this.getiOSData(this.page)
  }

  getiOSData (page, done) {
    const { getiOSData } = this.props
    getiOSData(page, done)
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
    this.getiOSData(this.page = 1, () => {
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
    this.getiOSData(this.page = this.page + 1, () => {
      this.setState({
        loading: false
      })
    })
  }

  renderiOSItem (info) {
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
    const { dispatch, iOSList } = this.props
    dispatch(pushWap(iOSList.get(index)))
  }

  render () {
    const { iOSList } = this.props
    let listView
    if (iOSList && iOSList.size) {
      listView = (
        <FlatList
          ItemSeparatorComponent={this.renderSeparator}
          ListFooterComponent={this.renderFooter}
          data={iOSList.toArray()}
          renderItem={this.renderiOSItem}
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
  const { iOS } = state
  return {
    iOSList: iOS.get('iOSList')
  }
}

function mapDispatchToProps (dispatch) {
  return {
    getiOSData: (page, done) => dispatch(
      callApi({
        api: `/data/iOS/10/${page}`,
        success: (response) => dispatch(
          iOSAction.iOSUpdate(response, page)
        ),
        method: 'GET',
        done
      })
    ),
    dispatch
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(iOS)
