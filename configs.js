let objectAssign = require('object-assign')
let fs = require('fs')
let path = require('path')
let baseConfig = require('./baseConfig.js')
let configsDir = path.resolve('./configs')
let configFiles = fs.readdirSync(configsDir)
let configs = []
console.log(baseConfig)
configFiles.forEach((filename) => {
    //必须是JSON配置文件
    if (filename.toUpperCase().indexOf('JSON') <= 0) {
        return false
    }
    let filePath = path.resolve(configsDir, filename)
    let conf = fs.readFileSync(filePath, 'utf8')
    try {
        let confValue = JSON.parse(conf)
        configs.push(objectAssign(baseConfig, confValue))
    } catch (e) {
        console.log('该文件不是标准的JSON文件 请检查文件语法:' + filePath)
    }
})

module.exports = configs
