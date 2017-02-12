/**
 * Created by hy on 2017/2/11.
 */
const objectAssign = require('object.assign')
const template = require('./template')
const fs = require('fs')
const jsonFile = require('jsonfile')
const path = require('path')

const configsDir = path.resolve('./configs')
const configFiles = fs.readdirSync(configsDir)

let projectInfo = {
  projectName: '',
  token: '',
  src: '',
  script: null
}
const rl = require('readline-sync')
// 获取项目名称
let inputProjectName = () => {
  let input = rl.question('1. 请输入项目的名称[eg: demo1]: ')
  if (input) {
    if (configFiles.join(',').replace(/\.json/g, '').indexOf(input) >= 0) {
      let isCover = rl.question('已经存在同名的项目 是否覆盖？y or n: ')
      if (isCover.toLowerCase() !== 'y') {
        inputProjectName()
        return
      }
    }
    projectInfo.projectName = input
    console.log('\n')
  } else {
    inputProjectName()
  }
}
// 获取监听Token
let inputToken = () => {
  let input = rl.question('2. 请输入项目的 token[eg: 123456]: ')
  if (input) {
    projectInfo.token = input
    console.log('\n')
  } else {
    inputToken()
  }
}
// 获取监听Event
let inputEvent = () => {
  let input = rl.question('3. 请输入项目需要监听的事件用英文逗号合开\n[默认监听： merge_request,pull_request,push]: \n详见：https://open.coding.net/webhook.html#webhook \n: ')
  if (input) {
    projectInfo.watchEvents = input.split(',')
  } else {
    projectInfo.watchEvents = 'merge_request,pull_request,push'.split(',')
  }
  console.log('\n')
}
// 获取项目路径
let inputSrc = () => {
  let input = rl.question('4. 请输入项目的绝对路径[eg: /data/wwwroot/projectName]: ')
  if (input) {
    projectInfo.src = input
    console.log('\n')
  } else {
    inputSrc()
  }
}
// 获取监听反馈命令行
let inputScript = () => {
  let input = rl.question('5. 请输入项目的监听执行的命令 以上一步输入的绝对路径为执行路径\n [eg: pm run build 也可以输入JSON字符串 监听指定事件[key: 事件名 value: 命令]：{"merge_request"： "npm run build"}] : ')
  if (input) {
    projectInfo.script = input
    console.log('\n')
  } else {
    inputScript()
  }
}

/**
 *   确定创建项目监听
 *   1. 读取模板文件
 *   2. 体检相应项目信息
 *   3. 以projectName.json为名 拷贝文件到configs/下
 *   4. 提示管理员 通过 pm2 restart WebHookMonitor 重启WebHook监听服务
 */

let confirmCreate = () => {
  let input = rl.question(`确定以上项目配置正确并创建相应文件吗？\n[如果修改可以通过修改configs/{$projectInfo.projectName}.json修改] 请输入 y 或者 n: `)
  if (input === 'y') {
    let config = objectAssign(template, projectInfo)
    let filePath = path.resolve('./configs/', projectInfo.projectName + '.json')
    // 写入文件
    jsonFile.writeFileSync(filePath, config, {spaces: 2})

    console.log(`[√️]创建项目 ${projectInfo.projectName} 成功`)
    console.log('Happy Hacking ~')
  } else {
    console.log('[×] 取消创建项目')
  }
}

inputProjectName()
inputToken()
inputSrc()
inputEvent()
inputScript()
confirmCreate()