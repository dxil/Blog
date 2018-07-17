## credential-management API

#### 1、现代浏览器密码管理问题

登录网站的流程一直处于非常麻烦的状态，用户代理一直在尝试改善登录体验，比如现代浏览器通常能够存储并且自动输入账号密码。

例如在登录某个站点时，会提示自动填充账号

![](./images/autocomplete.png)

该`autocomplete`属性提供了一种声明机制，通过该机制，网站可以与用户代理一起工作，通过将特定字段标记为“用户名”或“密码”来提高后者检测和填写登录表单的能力，尽管浏览器尝试用次优的方法来猜测哪些表单字段应该被填充/存储，但这通常会因为密码更改后，密码管理器无法更新从而导致不一致，甚至有时候是错误的填充行为，具有不常见登录机制的站点（例如，通过`XMLHttpRequest` [[XMLHTTPREQUEST\]](https://w3c.github.io/webappsec-credential-management/#biblio-xmlhttprequest)提交而不是form表单形式的登录）也难以可靠地检测。

另一方面用户希望使用联合身份提供者进行身份验证的情况越来越常见。例如在一些站点通过第三方如微信或微博登录，然而上面这种方式，浏览器无法自动填充联合登录账号的表单。每次都需要输入第三方的账号密码去验证使得流程麻烦。

如果能够使得站点与密码管理器交互，帮助用户代理了解他们选择使用的登录机制，随时更新密码，以及在用户无感知的情况下使用同一身份（包括经过允许的第三方身份）自动登录常登录的站点，那么登录流程将会得到简化

#### 2、credential-management

> 由于查看MDN资料时只有英文文档，于是翻译了MDN的[中文文档](https://developer.mozilla.org/zh-CN/docs/Web/API/Credential_Management_API)

credential-management 旨在简化更改密码的过程，以便客户端上本地存储的密码可以在服务器上进行修改的同时进行更新。并且开发人员能够存储和检索密码凭据和联合凭证。

使用这些 credential-management API，开发人员可以执行以下功能

- 只需轻按一下即可让用户登录。
- 记住用户用于登录的联合帐户。
- 在会话到期时为用户签名。



效果如图：

![](./images/selectAccount.png)

事先在密码管理器中保存了当前页面的账号密码以及模拟的第三方 www.test.com提供的账号后再次进入该页面，浏览器提示了当前页面有 **test** 用户账号密码与第三方 **test.com** 提供的账号为 **cuzz** 的用户信息，此时只需选择其中一个账号，来进行获取相应的账号信息，发送到服务端即可登录相应账户，在密码更改后也可以重新改变密码管理器中存储的账号密码，大大简化了登录流程以及解决第三方登录的不可保存问题



#### 3、credential-management API

接下来介绍 credential-management 中常用的几种API：

##### 3.1、navigator.credentials.store() 

当用户使用表单登录您的网站时，您可以使用 [navigator.credentials.store()](https://developer.mozilla.org/en-US/docs/Web/API/CredentialsContainer/store) 来存储凭据。浏览器将提示用户是否存储它。根据凭证的类型，使用[`new PasswordCredential()`](https://developer.mozilla.org/en-US/docs/Web/API/PasswordCredential) 或[`new FederatedCredential()`](https://developer.mozilla.org/en-US/docs/Web/API/FederatedCredential) 创建您要存储的凭证对象。

1. `PasswordCredential ` 类型：

   ```javascript
   let cred = new PasswordCredential({id: data.id, password: '123'})
   ```

   该方法创建一个当前站点的账号密码登录凭证

2. `FederatedCredential  ` 类型：

   ```javascript
   let cred = new FederatedCredential({
     id:       data.id,
     name:     data.name,
     iconURL:  data.iconURL || '',
     provider: data.provider
   });
   ```

   该方法通过传入id和name，以及提供方的站点来创建一个第三方站点的登录凭证

最终

```javascript
navigator.credentials.store(cred) //储存凭证
```

#####3.2 