const router = require('koa-router')()
const User = require('./../models/userSchema')
const util = require('./../utils/util')

router.prefix('/users')

router.post('/login', async (ctx) => {
  // 拿到请求的数据
  const { userName, userPwd } = ctx.request.body
  // mongoose 的语法 找到一条数据
  try {
    const res = await User.findOne({
      userName,
      userPwd
    })
    // 如果查询到了结果
    if (res) {
      ctx.body = util.success(res)
    } else {
      ctx.body = util.fail((msg = '账号密码不正确'))
    }
  } catch (err) {
    // 如果请求出错了 返回错误信息
    ctx.body = util.fail(err.msg)
  }
})

module.exports = router
