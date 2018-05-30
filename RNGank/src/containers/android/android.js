import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  ScrollView,
  View,
  FlatList,
  Text
  // Image,
  // TouchableOpacity
} from 'react-native'
import CacheImage from '../../components/common/cacheImage'
import * as AndroidAction from '../../actions/android'
import Screen from '../../utils/screenUtils'
import {CachedImage} from 'react-native-img-cache'
// import homeIcon from '../../../assets/img/tabbar/home.png'
// import Pages from '../../constants/pages'
import { callApi, pushWap } from '../../actions/app'
import StyleSheet from '../../utils/mStyleSheet'
import ItemCell from '../../components/common/itemCell'
import ImageCache from '../../utils/imageCache'
import DB from '../../utils/storage'
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
    width: 100,
    height: 100
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
  }

  static navigationOptions = ({navigation, screenProps}) => {
    // const {state, setParams, dispatch, goBack, navigate} = navigation
    return ({
      title: 'Android',
      tabBarLabel: 'Android'
    })
  }

  componentWillMount () {
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
    console.log('androidList', androidList.get(index), ImageCache.clear())
    dispatch(pushWap(androidList.get(index)))
  }

  render () {
    const { androidList } = this.props
    console.log('focusedDID', this.focused, this.focusedIndex)
    DB.get('cacheSize').then((response) => {
      console.log('response', response)
    })
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
        <ScrollView
          horizontal
          >
          <CachedImage
            style={styles.icon}
            source={{uri: 'https://ws1.sinaimg.cn/large/610dc034gy1fh9utulf4kj20u011itbo.jpg'}}
            />
          <CachedImage
            style={styles.icon}
            source={{uri: 'https://ws1.sinaimg.cn/large/610dc034ly1fh8ox6bmjlj20u00u0mz7.jpg'}}
              />
          <CachedImage
            style={styles.icon}
            source={{uri: 'https://ws1.sinaimg.cn/large/610dc034ly1fh7hwi9lhzj20u011hqa9.jpg'}}
                />
          <CachedImage
            style={styles.icon}
            source={{uri: 'https://ws1.sinaimg.cn/large/610dc034ly1fgllsthvu1j20u011in1p.jpg'}}
                          />
          <CachedImage
            style={styles.icon}
            source={{uri: 'https://ws1.sinaimg.cn/large/610dc034ly1fgj7jho031j20u011itci.jpg'}}
                                    />
          <CachedImage
            style={styles.icon}
            source={{uri: 'https://ws1.sinaimg.cn/large/610dc034ly1fgi3vd6irmj20u011i439.jpg'}}
                                              />
          <CachedImage
            style={styles.icon}
            source={{uri: 'https://ws1.sinaimg.cn/large/610dc034ly1fgepc1lpvfj20u011i0wv.jpg'}}
                                              />
          <CacheImage
            style={styles.icon}
            source={{uri: 'https://ws1.sinaimg.cn/large/610dc034ly1fgdmpxi7erj20qy0qyjtr.jpg'}}
                                              />
        </ScrollView>
        <Text>
           MB
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
