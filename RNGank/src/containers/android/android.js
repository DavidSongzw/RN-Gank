import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  View,
  FlatList,
  Text,
  Image,
  TouchableOpacity
} from 'react-native'
import * as AndroidAction from '../../actions/android'
import Screen from '../../utils/screenUtils'
import homeIcon from '../../../assets/img/tabbar/home.png'
// import Pages from '../../constants/pages'
import { callApi, pushWap } from '../../actions/app'
import StyleSheet from '../../utils/mStyleSheet'
import ItemCell from '../../components/common/itemCell'
// import configureStore from '../../store/configureStore'
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
  },
  icon: {
    width: 20,
    height: 20
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
    this.focusedIndex = 1
    this.click = this.click.bind(this)
  }

  static navigationOptions = ({navigation, screenProps}) => {
    const {state, setParams, dispatch, goBack, navigate} = navigation
    // const store = configureStore({}).getState()
    // console.log('store', store)
    return ({
      title: 'Android',
      tabBarLabel: 'Android',
      tabBarIcon: (tabBar) => {
        // console.log('props', navigation, tabBar, new Android(), state, setParams, dispatch, goBack, navigate)
        console.log('Androidprops', state, tabBar)
        // if (focused) {
        //   navigation.setParams({'top': 'top'})
        // } else {
        //
        // }
        // this.renderTabBar(focused, tintColor)
        // this.focused = focused
        // this.getFocused(focused)
        if (tabBar.focused) {
          // dispatch(push({routeName: Pages.Login}))
          return (
            <TouchableOpacity
            >
              <Image
                source={homeIcon}
                style={[styles.icon, {tintColor: 'red'}]} />
            </TouchableOpacity>
          )
        } else {
          return (
            <TouchableOpacity
              onPress={() => {
                setParams({'top': 'top'})
              }}
            >
              <Image
                source={homeIcon}
                style={[styles.icon, {tintColor: 'blue'}]} />
            </TouchableOpacity>
          )
        }
      }
    })
  }

  // static navigationOptions = ({ navigation }) => {
  //   const {state, setParams} = navigation
  //   const isInfo = state.params.mode === 'info'
  //   const {user} = state.params
  //   return {
  //     title: isInfo ? `${user}'s Contact Info` : `Chat with ${state.params.user}`,
  //     headerRight: (
  //       <Button
  //         title={isInfo ? 'Done' : `${user}'s info`}
  //         onPress={() => setParams({ mode: isInfo ? 'none' : 'info'})}
  //     />
  //   )
  //   }
  // }

  componentWillMount () {
    // this.renderNav()
  }
  componentDidMount () {
    // console.log('focusedDID', this.focused, this.focusedIndex)
    // const { navigation } = this.props
    // console.log('didMount', navigation)
    this.getAndroidData(this.page)
  }

  click () {
    const { dispatch } = this.props
    dispatch({type: 'TAB_HOME'})
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
    console.log('onRefresh', 'aaaaaa')
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
    console.log('loadMore', 'aaaaaa')
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
    console.log('focusedDID', this.focused, this.focusedIndex)
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
        <Text
          onPress={this.click}
        >
        加上了打飞机圣诞节疯狂送积分鲁大师
        </Text>
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
