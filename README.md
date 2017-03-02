# 初衷【Node处女作🙄】

每次上线项目都要build build build... 不厌其烦的biu biu biu ~ biu得我肾虚

Duang 每次都是重复的步骤 写个脚本不就行了吗? 

真得感慨Nodejs统治世界啊 刚好也是自己写的第一个Nodejs开源项目 然后这个小玩意就这样出来啦~

# 原理或功能
- 接收WebHook通知(dev branch merge to master branch or any events~)
- 然后通过读取预先配置好的项目配置到项目目录git pull拉取最新代码
- 匹配事件对应的命令 然后执行对应的命令或者脚本功能
- 完成项目部署~
* Notice: 所有命令都会在项目目录中执行



# 怎么跑起来啊

*在项目源码已经放到服务器（确保你服务器上已经部署了ssh 能在项目目录中执行git pull）的情况下*

```
git clone https://github.com/deboyblog/web-hook-deploy

cd web-hook-deploy

npm run install

npm install pm2 -g

npm run create // 创建项目相关配置 生成好配置后 到coding对应项目的webHook设置中添加上相应的配置 默认监听 7070 端口 url： http://ip:7070

pm2 start process.json

push一次你的代码 // pm2 logs web-hook-monitor 查看实时日志

坐等build 或者 deploy 完成 享受编码过程 节省部署时间

HappyHacking~
```

## TODO
 - [] 完善文档
 - [] 完善容错机制和运行日志
 - [] 将PM2整合进来

