import Immutable from 'immutable'
/**
* Android数据model
*/

const AndroidRecord = Immutable.Record({
  createdAt: '',
  desc: '',
  images: [],
  publishedAt: '',
  source: '',
  type: '',
  url: '',
  who: ''
}, 'Android')

class Android extends AndroidRecord {
}
export default Android
