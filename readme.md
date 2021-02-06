# Tenor README
业务服务进程监控，若检测到进程异常，会向企业微信发送消息通知

# 依赖

* Node.js
* status.sh 参考项目中 status.sh文件输出结果
* 企业微信消息通知接口

# 使用部署

* 运行 npm install 安装依赖。
* 修改config.js。指定platformStr、statusShellPath、logFile 等配置。
* 配置定时任务。控制台输入crontab -e 打开crontab编辑器。输入 ```*/2 * * * * /root/.nvm/versions/node/v10.15.3/bin/node /root/tenor/main.js```  示例为每两分钟检测一次，可根据实际情况调整并修改node与tenor的目录。
* 运行systemctl restart crond.service 重启crond。
* 查看config中配置的日志路径文件，check日志输出是否正常。
