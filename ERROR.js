module.exports = {
	EMPTY_TOKEN: {
		code: 401,
		msg: '缺少token参数 请检查'
	},
	AUTH_FAILED: {
		code: 402,
		msg: 'token校验失败'
	},
	NO_MATCH_DEPLOY_SCRIPT: {
		code: 403,
		msg: '没有匹配到deploy操作或者事件类型未被监听'
	},
	DEPLOY_ERROR: {
		code: 405,
		msg: '部署任务执行失败：'
	}
}