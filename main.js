
var shell = require('shelljs');
var axios = require('axios');
var config = require('./config');
var log = require('./log');

/**
 * 发送警告消息
 * 
 * @param {string} str 消息内容
 */
function sendMessage(str) {
    axios.request({
        url : config.warningInterfaceUrl,
        method: 'post',
        header:{
            'Content-Type':'application/json'
        },
        data: {
            message: str,
            agentId: 1000004
        }
    }).then(()=> {
        log.info('【警告发送成功】 ' + str);
    }, (err)=> {
        log.info(err)
        log.error('【警告发送失败】' + str);
    })
}

shell.exec('sh ' + config.statusShellPath, (code, stdout, stderr) => {
    if (code === 0) {
        let input = stdout.split('\n');
        let errorServiceList = [];
        input.forEach((item)=> {
            if (item.indexOf('OFF') > -1) {
                let serverInfo = item.split(/\s+/);
                let serverIp = serverInfo[0];
                let serverName = serverInfo[1];
                errorServiceList.push('【' + config.platformStr + '】' + serverName + ' ' + serverIp + ' ' + '进程故障');
            }
        });
        // 有异常监控，发送警告消息
        if (errorServiceList.length) {
            sendMessage(errorServiceList.join('\n'));
        } else {
            log.info('检测正常');
        }
    }
});
