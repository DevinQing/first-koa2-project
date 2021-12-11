/**
 * 日志存储
 */
const log4js = require('log4js')

const levels = {
  trace: log4js.levels.TRACE,
  debug: log4js.levels.DEBUG,
  info: log4js.levels.INFO,
  warn: log4js.levels.WARN,
  error: log4js.levels.ERROR,
  fatal: log4js.levels.FATAL
}

// 这个追加器和类型的作用是什么？
// 追加器的目的就是设置日志以什么形式输出，比如 控制台 还是 文件等
// 类型对象就用于将前面定义的追加器配置定义到相应的类型上去
log4js.configure({
  appenders: {
    console: { type: 'console' },
    info: {
      type: 'file',
      filename: 'logs/info-logs.log'
    },
    error: {
      type: 'dateFile',
      filename: 'logs/error-log',
      pattern: 'yyyy-MM-dd.log',
      alwaysIncludePattern: true // 设置文件名称为 filename + pattern
    }
  },
  categories: {
    default: { appenders: ['console'], level: 'debug' },
    error: {
      appenders: ['console', 'error'],
      level: 'error'
    },
    info: {
      appenders: ['console', 'info'],
      level: 'info'
    }
  }
})

// 这个语法相当于简化版的直接导出一个名为 debug 的函数
/**
 * 日志输出，level为debug
 * @param {string} content
 */
exports.debug = (content) => {
  let logger = log4js.getLogger()
  logger.level = levels.debug
  logger.debug(content)
}

/**
 * 日志输出 level为error
 * @param {string} content
 */
exports.error = (content) => {
  let logger = log4js.getLogger('error')
  logger.level = levels.error
  logger.error(content)
}

/**
 * 日志输出 level为info
 * @param {string} content
 * getLogger 里面的参数是根据 log4js.configure 里面的 categories 来的
 */
exports.info = (content) => {
  let logger = log4js.getLogger('info')
  logger.level = levels.info
  logger.info(content)
}
