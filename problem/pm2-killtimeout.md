在使用PM2管理node服务进程时，经常遇到pm2不等进程处理完数据即关闭
需要在pm2启动时带上参数 kill-timeout 就不会立即关闭
另外在pm2重启时，http-graceful-shutdown 在集群模式下，after不'执行'的问题，其实执行了 只是日志落在不同的日志文件上