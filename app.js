/**
 * Created by hy on 2017/2/11.
 */
let process = require('child_process')
let ERROR = require('./ERROR.js')
let objectAssign = require('object.assign')
let configs = require('./configs.js')
// output
let result = {
  code: 200,
  data: null,
  msg: '操作成功',
  success: true
}
module.exports = function (app) {
  app.post('/', (req, res) => {
    if (!req.body || !req.body['token']) {
      result = objectAssign(result, ERROR.EMPTY_TOKEN)
    } else {
      let event = req.body['event'] && req.body['event'].toLowerCase()
      let config = null
      let matchConfig = (token, configList) => {
        let matchConf = null
        configList.forEach((conf) => {
          if (token === conf.token) {
            matchConf = conf
            return true
          }
        })
        return matchConf
      }
      config = matchConfig(req.body['token'], configs)
      if (config) {
        console.log('匹配到项目：' + config.projectName)
        // 在git操作更新的前提下 才能执行项目的的deploy操作
        process.exec('git pull', {'cwd': config.src},
          function (error, stdout, stderr) {
            console.log('success log: \n' + stdout)
            console.log('error log: \n' + stderr)
            if (error !== null) {
              result.code = 400
              result.msg = stdout + error
            } else {
              console.log('进入项目脚本匹配阶段')
              console.log('接收到的：' + event)
              console.log('项目中的：' + config.watchEvents.join(','))
              if (config.watchEvents.length !== 0 && config.watchEvents.join(',').indexOf(event) >= 0) {
                // 如果是字符串 就默认所有事件都执行
                console.log('命令脚本类型： ' + typeof config.script)
                if (typeof config.script === 'string') {
                  console.log('匹配事件成功:' + event + ' 执行命令:' + config.script)
                  process.exec(config.script, {cwd: config.src}, (error2, stdout2, stderr2) => {
                    if (error2 !== null) {
                      result = objectAssign(result, ERROR.NO_MATCH_DEPLOY_SCRIPT, {msg: ERROR.NO_MATCH_DEPLOY_SCRIPT.msg + error2 + stderr2})
                    } else {
                      console.log('执行命令成功:' + config.script)
                      result.msg = '操作成功: ' + stdout2
                    }
                  })
                } else {
                  process.exec(config.script[event], {cwd: config.src}, (error2, stdout2, stderr2) => {
                    console.log('匹配事件成功:' + event + ' 执行命令:' + config.script[event])
                    if (error2 !== null) {
                      result = objectAssign(result, ERROR.NO_MATCH_DEPLOY_SCRIPT, {msg: ERROR.NO_MATCH_DEPLOY_SCRIPT.msg + error2 + stderr2})
                    } else {
                      console.log('执行命令成功:' + config.script[event])
                      result.msg = '操作成功: ' + stdout2
                    }
                  })
                }
              } else {
                result = objectAssign(result, ERROR.NO_MATCH_DEPLOY_SCRIPT)
              }
            }
          })
      } else {
        result = objectAssign(result, ERROR.AUTH_FAILED)
      }
    }
    console.log(result)
    res.send(JSON.stringify(result))
  })
}