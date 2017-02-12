const fs = require('fs')
const path = require('path')

const configsDir = path.resolve('./configs')

const configFiles = fs.readdirSync(configsDir)

let configs = []

configFiles.forEach((filename) => {
  //必须是JSON配置文件
  if (filename.toUpperCase().indexOf('JSON') <= 0) {
    return false
  }
  let config = null
  let filePath = path.resolve(configsDir, filename)
  const conf = fs.readFileSync(filePath, 'utf8')
  try {
    config = JSON.parse(conf)
  } catch (e) {
    console.log('该文件不是标准的JSON文件 请检查文件语法:' + filePath)
  }
  config ? configs.push(config) : ''
})

module.exports = configs
