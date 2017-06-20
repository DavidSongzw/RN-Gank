import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  View,
  FlatList
  // Text
} from 'react-native'
import * as WelfareAction from '../../actions/welfare'
// import Screen from '../../utils/screenUtils'
import Pages from '../../constants/pages'
import { callApi, push } from '../../actions/app'
// import StyleSheet from '../../utils/mStyleSheet'
import ItemCell from '../../components/common/imageItemCell'

// const styles = StyleSheet.create({
//   footer: {
//     alignItems: 'center',
//     justifyContent: 'center'
//   },
//   textFooter: {
//     textAlign: 'center'
//   }
// })

class Welfare extends Component {
  constructor (props) {
    super(props)
    this.page = 1
    this.state = {
      refreshing: false,
      loading: false
    }
    this.displayName = 'Welfare'
    this.goNext = this.goNext.bind(this)
    this.getWelfareData = this.getWelfareData.bind(this)
    this.renderAndroidItem = this.renderAndroidItem.bind(this)
    this.onRefresh = this.onRefresh.bind(this)
    this.loadMore = this.loadMore.bind(this)
  }
  static navigationOptions = {
    tabBarLabel: '福利',
    title: '福利'
  }

  componentDidMount () {
    this.getWelfareData(this.page)
  }

  getWelfareData (page, done) {
    const { getWelfareData } = this.props
    getWelfareData(page, done)
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
    this.getWelfareData(this.page = 1, () => {
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
    this.getWelfareData(this.page = this.page + 1, () => {
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

  goNext (index) {
    const { dispatch, welfareList } = this.props
    const params = welfareList.get(index)
    dispatch(push({routeName: Pages.WelfareDetail, params}))
  }

  render () {
    const { welfareList } = this.props
    let listView
    if (welfareList && welfareList.size) {
      listView = (
        <FlatList
          ListFooterComponent={this.renderFooter}
          data={welfareList.toArray()}
          renderItem={this.renderAndroidItem}
          keyExtractor={(item, index) => index}
          onRefresh={this.onRefresh}
          refreshing={this.state.refreshing}
          onEndReachedThreshold={0.2}
          onEndReached={this.loadMore}
          numColumns={2}
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
  const { welfare } = state
  return {
    welfareList: welfare.get('welfareList')
  }
}

function mapDispatchToProps (dispatch) {
  return {
    getWelfareData: (page, done) => dispatch(
      callApi({
        api: `/data/福利/10/${page}`,
        success: (response) => dispatch(
          WelfareAction.welfareUpdate(response, page)
        ),
        method: 'GET',
        done
      })
    ),
    dispatch
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Welfare)
