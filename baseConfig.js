let baseConfig = {
	token: '',
    // 监听webhook事件列表 merge push etc...
    watchEvents: [],
    // 项目目录
    src: '',
    // 执行脚本 键(watchEvents中的值) - 值(脚本命令)
    script: {
        // eg: 'merge': 'npm run build'
    }
}
module.exports = baseConfig
