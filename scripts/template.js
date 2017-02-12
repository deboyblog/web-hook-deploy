/**
 * Created by hy on 2017/2/12.
 */
let template = {
  projectName: '',
  token: '',
  // 监听webhook事件列表 merge push etc...
  watchEvents: [],
  // 项目目录
  src: '',
  // 执行脚本 键(watchEvents中的值) - 值(脚本命令) 可以是字符串即只要匹配上监听事件 都执行该命令
  script: null
}
module.exports = template
