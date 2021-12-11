const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const log4js = require('./utils/log4js')
const users = require('./routes/users')
const router = require('koa-router')()

// error handler
onerror(app)

require('./config/db')
// middlewares
app.use(
  bodyparser({
    enableTypes: ['json', 'form', 'text']
  })
)
app.use(json())
// app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(
  views(__dirname + '/views', {
    extension: 'pug'
  })
)

// logger
app.use(async (ctx, next) => {
  // 打印参数方便查看
  console.log(ctx)
  log4js.info(`body: ${JSON.stringify(ctx.request.body)} `)
  log4js.info(`params: ${JSON.stringify(ctx.request.params)} `)

  await next()
})

// routes
// app.use(router.routes(), users.allowedMethods())
router.prefix('/api')

// 注意 这里既然在全局定义了前缀，就应该把 先加载router对象 然后再加载 users app 改成 router
// app.use(users.routes(), users.allowedMethods())
app.use(router.routes(), users.allowedMethods())
router.use(users.routes(), users.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  log4js.error(err)
})

module.exports = app
