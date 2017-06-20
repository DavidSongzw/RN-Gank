import { required } from './func'

const regs = {
  // mobile: /^1[0-9]{10}$/,
  mobile: /^1\d{10}$/,
  // passwd: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/,
  passwd: /^[0-9A-Za-z]{6,20}$/,
  smsCode: /^[0-9]{4,8}$/,
  userName: /^.{2,30}$/,
  realName: /^.{2,30}$/,
  nickName: /^.{2,30}$/,
  bankCardNum: /^[0-9]{16,19}$/,
  businessLicence: /^[0-9]{16}$|^[0-9]{19}$/,
  branchBank: /^.{2,40}$/,
  companyName: /^.{1,20}$/,
  address: /^.{1,50}$/,
  postCode: /^[1-9][0-9]{5}$/,
  qq: /^\d{5,10}$/,
  money: /^\d{1,10}(\.\d{2})?$/,
  email: /^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/,
  tel: /^(\d{11})$|^((\d{7,8})|(\d{4}|\d{3})-(\d{7,8})|(\d{4}|\d{3})-(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1})|(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1}))$/,
  consignee: /^.{2,30}$/,
  phone: /^1[0-9]{10}$/,
  proCity: /^.{2,30}$/,
  street: /^.{2,30}$/,
  IDCard: /^[1-6][0-7][\d]{4}((19[\d]{2})|(20[0-1][\d]))((0[1-9])|(1[0-2]))((0[1-9])|([1-2]\d)|(3[0-1]))[\d]{3}[\dx]$/,
  price: /^[0-9]+(\.[0-9]{0,2})?$/
}

class Validator {
  is ({ type = required(), input = '' }) {
    const reg = regs[type]
    if (!reg) {
      throw new Error(`还没有${type}的正则表达式哦！`)
    } else {
      if (input === null) {
        return false
      }
      return reg.test(input)
    }
  }

  not ({ type = required(), input = '' }) {
    return !this.is({ type, input })
  }
}

const instance = new Validator()
export default instance
