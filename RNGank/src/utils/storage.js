import { AsyncStorage } from 'react-native'
/**
 * 存储类
 */
class DB {
  /**
   * 存储数据
   * @param  {[type]}  key      key
   * @param  {[type]}  value    值，可以是对象
   * @return {[promise]}           [description]
   */
  put (key, value) {
    let result = value
    if (typeof value === 'object') {
      result = JSON.stringify(value)
    }
    return AsyncStorage.setItem(key, result)
  }

  /**
   * 取数据
   * @param  {[type]}  key      key
   * @return {[promise]}           [description]
   */
  async get (key) {
    const value = await AsyncStorage.getItem(key)
    let result
    try {
      result = JSON.parse(value)
      return result
    } catch (e) {
      return value
    }
  }

  multiSet (kvs) {
    const newKvs = kvs.map((kv) => {
      let value = kv[1]
      if (typeof value === 'object') {
        value = JSON.stringify(value)
      }
      return [kv[0], value]
    })
    return AsyncStorage.multiSet(newKvs)
  }

  async multiGet (keys) {
    const values = await AsyncStorage.multiGet(keys)
    const result = {}
    values.forEach((value) => {
      let v
      try {
        v = JSON.parse(value[1])
      } catch (e) {
        v = value[1]
      } finally {
        result[value[0]] = v
      }
    })
    console.log('multiGet', keys, result)
    return result
  }

  /**
   * 清除某个key
   * @param  {[type]}  key      key
   * @return {[Promise]}           [description]
   */
  remove (key) {
    return AsyncStorage.removeItem(key)
  }
}

const instance = new DB()

export default instance
