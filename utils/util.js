const log4js = require('./log4js')
/**
 * 通用工具函数
 */

const CODE = {
  SUCCESS: 200,
  PARAM_ERROR: 10001, // 参数错误
  USER_ACCOUNT_ERROR: 20001, // 账号或密码错误
  USER_LOGIN_ERROR: 30001, // 用户未登录
  BUSINESS_ERROR: 40001, //业务请求失败
  AUTH_ERROR: 500001 // 认证失败或TOKEN过期
}

module.exports = {
  /**
   * 分页结构封装
   * @param {number} pageNum
   * @param {number} pageSize
   */
  pager({ pageNum = 1, pageSize = 10 }) {
    // 转化成数组型
    pageNum *= 1
    pageSize *= 1

    const skipIndex = (pageNum - 1) * pageSize
    return {
      page: {
        pageNum,
        pageSize
      },
      skipIndex
    }
  },
  // 封装请求成功时候的函数
  success(data = '', msg = '', code = CODE.SUCCESS) {
    log4js.debug(data)
    return {
      code,
      data,
      msg
    }
  },
  // 封装请求失败的函数
  fail(data = '', msg = '', code = CODE.BUSINESS_ERROR) {
    log4js.debug(msg)
    return {
      code,
      data,
      msg
    }
  }
}
