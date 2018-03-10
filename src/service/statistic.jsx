import Util from 'util/util.jsx'

const _util = new Util()

export default class Statistic {
  getStatisticCount() {
    return _util.request({
      url: '/manage/statistic/base_count.do'
    })
  }
}
