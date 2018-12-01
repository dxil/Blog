我的运行环境：
osx:  10.13.4
node:  8.11.1
npm:  5.6.0 (weex官方建议用  4 因为5暂未支持，目前我用着5没啥影响)  
xcode:  9.3

1.  pod update 失败，无法更新，系统环境中由于openssl以及ruby版本过低原因
解决： https://stackoverflow.com/questions/38993527/cocoapods-failed-to-connect-to-github-to-update-the-cocoapods-specs-specs-repo?answertab=votes#tab-top

2.在weex  build ios 过程中 遇到XCode  build失败 有可能是多个XCode版本原因
尝试 sudo xcode-select -s /Applications/Xcode.app/Contents/Developer

3. weex  build ios  过程最后在Weex中是无法直接打包出来，会出现** BUILD FAILED **， Package your project as a normal ios project! 这时候需要将运行环境通过Xcode打开，打开工程 plateforms/ios/WeexDemo.xcworkspace      注意不是打开WeexDemo.xcode.proj 
接下来的步骤依据 官网 https://weex.incubator.apache.org/cn/guide/integrate-to-your-app.html#ji-cheng-dao-ios
注意：官网上的 
![image](https://user-images.githubusercontent.com/17681925/49266003-6bbf4d00-f48f-11e8-9c6c-258b801bf60e.png)
不需要添加 WeexSDK.framework!

另外有些坑是因为网上的解决方案基于当时比较老旧的官方包教程（今年以前的都算老旧） 去解决，之后就会出现 更多Bug 