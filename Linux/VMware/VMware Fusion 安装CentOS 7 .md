# VMware Fusion 安装CentOS 7 

## 一、新建虚拟机 

1. 选择安装方法-创建自定虚拟机

![选择](./images/pic_1.png)

2. 选择CentOS 7 64位

   ![选择安装机](./images/pic_2.png)

   ​

3. 选择传统BIOS

   ![选择固件类型](./images/pic_3.png)

4. 选择新建虚拟盘

   ![新建虚拟盘](./images/pic_4.png)

5.完成

![完成](./images/pic_5.jpg)



## 二、安装CentOS 7 

1. 点击虚拟机的设置

   ![设置虚拟机](./images/pic_6.png)

2.点击 CD/DVD 

![设置DVD](./images/pic_7.png)



3.选择DVD镜像

![选择镜像安装](./images/pic_8.png)



**由于我本机没有CentOS DVD镜像，所以需要下载 （如果已经下载，请移至步骤四）**



## 三、下载CentOS 7 DVD镜像

1.下载地址为 [CentOS/Downloads](https://centos.org/download/)

2.选择DVD ISO

3.优先选择阿里云，搜狐，网易，华为等镜像，下载速度会快些

![镜像](./images/pic_9.png)



下载好后，继续从DVD处安装镜像



## 四、安装CentOS 7 系统

1. 下载完成后，即可添加设备

   ![添加CentOS镜像](./images/pic_10.png)

2. 回到设置界面，选择 “启动磁盘”

   ![启动磁盘](./images/pic_11.png)

3. 选择DVD后重新启动

   ![选择磁盘](./images/pic_12.png)

4. 我这里选择的是第二种

   ![选择种类](./images/pic_13_4.png)

5. 选择语言（英语渣，所以选择了中文。。）

![language](./images/pic_14_4.png)



6. 继续 (忘截图了，撸了一张英文图。。。)

![summary](./images/pic_14_1_4.png) 

7. 点击SOFTWARE SELECTION 进入环境选择

![选择安装的环境](./images/pic_15_4.png)

Tips: **默认为最小安装，如果要带有GUI之类的需要自己选择GUI的服务器选项，虽然网上有说最小安装后之后的桌面可以再装，但是会有意料之外的错误，比如Yum没有安装等，由于我只需要使用其中的命令行就OK，所以我选择了虚拟化主机**



8. 点击完成后进入安装目标位置，直接点击完成

![location](./images/pic_16_4.png)



9. 点击网络，打开，然后点击完成

   ![network](./images/pic_17_4.png)

10. 点击开始安装

   ![users](./images/pic_18_4.png)

11. 设置ROOT密码

   ![root](./images/pic_19_4.png)

12. 耐心等待安装完成

13. 完成后点击重启

   ![reboot](./images/pic_20_4.png)



## 五、一些问题

1. 重启后，Ping一下Baidu.com是否联网

   ![](./images/pic_21_4.png)

如果无法联网，更改为桥接模式，service network restart。或者关闭虚拟机，重新生成mac地址。一般情况下nat模式即可

2. ifconfig查看Ip 地址后，即可通过ssh访问

   ![](./images/pic_22_4.png)