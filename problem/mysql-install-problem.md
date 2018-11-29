mysql 5.7以上如果是第一次安装，会随机生成一个随机密码
需要到 /var/log/mysqld.log 文档下面找  u,n1tFlhS6P9 
官网： https://dev.mysql.com/doc/relnotes/mysql/5.7/en/news-5-7-4.html
￼
![image](https://user-images.githubusercontent.com/17681925/49204405-bd5fcd00-f3e6-11e8-8379-01ee30c35a31.png)

但是linux安装mysql时找不到.mysql_secret文件，所以只能找运行时的文件
cat /var/log/mysqld.log 最后找到了密码

![image](https://user-images.githubusercontent.com/17681925/49204430-d10b3380-f3e6-11e8-8822-0de64621cf4b.png)
￼