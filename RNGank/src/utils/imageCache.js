import RNFetchBlob from 'react-native-fetch-blob'
import md5 from 'md5'
import DB from '../utils/storage'
import {
  ImageURISource
} from 'react-native'
const BASE_DIR = RNFetchBlob.fs.dirs.CacheDir + '/react-native-img-cache'

class ImageCache {
  constructor () {
    this.cache = {
      downloading: false,
      handlers: [],
      path: '',
      task: {},
      uri: '',
      method: ''
    }
  }
  getPath (uri: string) {
    console.log('getPath', uri)
    let path = uri.substring(uri.lastIndexOf('/'))
    path = path.indexOf('?') === -1 ? path : path.substring(path.lastIndexOf('.'), path.indexOf('?'))
    const ext = path.indexOf('.') === -1 ? '.jpg' : path.substring(path.indexOf('.'))
    return BASE_DIR + '/' + md5(uri) + ext
  }

  clear () {
    this.cache = {
      downloading: false,
      handlers: [],
      path: '',
      task: {},
      uri: '',
      method: ''
    }
    RNFetchBlob.fs.unlink(BASE_DIR).then((result) => {
      console.log('unlink', result)
      return true
    })
  }

  on (source: ImageURISource, handler) {
    const {uri} = source
    console.log('on source', typeof source, typeof handler, this.cache.uri)
    if (!this.cache.uri) {
      this.cache = {
        uri,
        downloading: false,
        handlers: [handler],
        path: this.getPath(uri)
      }
    } else {
      this.cache.handlers.push(handler)
    }
    this.get(uri)
  }

  dispose (uri: string, handler) {
    this.cache.uri = uri
    const cache = this.cache
    if (cache) {
      cache.handlers.forEach((h, index) => {
        if (h === handler) {
          cache.handlers.splice(index, 1)
        }
      })
    }
  }

  bust (uri: string) {
    this.cache.uri = uri
    const cache = this.cache
    if (cache !== undefined) {
      cache.path = undefined
      this.get(uri)
    }
  }

  cancel (uri: string) {
    this.cache.uri = uri
    const cache = this.cache
    if (cache && cache.downloading) {
      cache.task.cancel()
    }
  }

  download (cache) {
    const {uri} = cache
    console.log('download', typeof cache, uri)
    if (!cache.downloading) {
      const path = this.getPath(uri)
      cache.downloading = true
      const method = cache.method ? cache.method : 'GET'
      cache.task = RNFetchBlob.config({ path }).fetch(method, uri, cache.headers)
      console.log('resdowntask')
      cache.task.then((res) => {
        if (res.respInfo && res.respInfo.headers && res.respInfo.headers['Content-Length']) {
          const size = parseFloat(res.respInfo.headers['Content-Length']) / (1024 * 1024)
          console.log('resdown', res.respInfo.headers['Content-Length'])
          DB.get('cacheSize').then((result) => {
            let cacheSize = result || 0
            cacheSize = parseFloat(parseFloat(cacheSize) + size).toFixed(2)
            DB.put('cacheSize', cacheSize)
          })
        }
        cache.downloading = false
        cache.path = path
        this.notify(uri)
      }).catch(() => {
        cache.downloading = false
                // Parts of the image may have been downloaded already, (see https://github.com/wkh237/react-native-fetch-blob/issues/331)
        RNFetchBlob.fs.unlink(path)
      })
    }
  }

  get (uri: string) {
    this.cache.uri = uri
    const cache = this.cache
    console.log('getimage', uri, this.cache, this.cache.uri, cache)
    if (cache.path) {
            // We check here if IOS didn't delete the cache content
      RNFetchBlob.fs.exists(cache.path).then((exists: boolean) => {
        if (exists) {
          this.notify(uri)
        } else {
          this.download(cache)
        }
      })
    } else {
      this.download(cache)
    }
  }

  notify (uri: string) {
    const handlers = this.cache.handlers
    handlers.forEach(handler => {
      handler(String(this.cache.path))
    })
  }
}

const instance = new ImageCache()

export default instance
