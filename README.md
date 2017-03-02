# webhook-deploy
- 接收WebHook通知(dev branch merge to master branch or any events~)
- 然后通过读取预先配置好的项目配置
- 执行相应HookEvents对应的命令或者脚本功能
完成项目部署~

建议用PM2 跑这个进程
- npm run create // 输入项目相关配置 注意 克隆对应项目到你的服务器上
- push一次你的代码 // pm2 logs web-hook-monitor 查看实时日志
- 坐等build 或者 deploy 完成