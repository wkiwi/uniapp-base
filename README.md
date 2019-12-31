<!--
 * @Author: wkiwi
 * @Email: w_kiwi@163.com
 * @Date: 2019-05-31 15:27:44
 * @LastEditors: wkiwi
 * @LastEditTime: 2019-11-05 21:31:57
 -->
# uniapp-base

## 介绍
uniapp脚手架，工程化目录，包含VueX,$bus,请求拦截，node模拟数据后端等

目前自身使用uniapp开发小程序居多，main.js触发vueX静默登陆，全局保持登陆状态
此时遇到问题为程序级与页面级同步加载页面级onload内的请求有可能走在登陆回调之前

鄙人解决方案   页面级涉及到用户登陆信息接口调用在onload中加延时执行
如果您有更好的方案请邮箱至w_kiwi@163.com
```
computed: {
  ...mapState('auth', {
    userinfo: (state) => state.user,
  }),
},
onLoad() {
  let timeId = setInterval(() => {
    if (this.userinfo&&this.userinfo.u_id) { //检测到有登陆信息后执行
      clearInterval(timeId)
      this.getHomeList() //拉取首页数据
    }
  }, 10)
},
```
# 安装依赖
 - $ npm install

# 启动node服务
 - $ npm run start

# bus传值
```
  //使用方式
  Vue.use(Bus)
  this.$bus('eventName', id);
  
  bus: {
   eventName(id) {
     console.log(id);
   }
  }

```

## 项目目录
```
.
├── App.Vue                         # 主应用组件
├── pages.json                      # 页面路由配置
├── manifest.json                   # uni配置页
├── main.js                         # 入口文件
├── package.json                    # 引入第三方npm包
├── common                          # 公共 方法 工具等
│   └── utils                       # 公共 工具
│   └── http-client                 # 公共 请求方法
│   └── ...
├── components                      # 公共 UI 组件
│   └── ...
├── config                          # 公共 设置
│   └── api.config                  # 公共 接口设置
│   └── app.config                  # 公共 url 平台 等设置
│   └── ...
├── pages                           # 页面
│   ├── home                        # 首页示例模板
│   ├── mine                        # 我的示例模板
│   └── ...                         
├── plugins                         # 第三方工具
│   └── ...
├── services                        # 服务端
│   └── api-clinet                  # 接口请求拦截
│   └── api.service                 # 接口封装
│   └── auth.service                # 登陆本地缓存操作
│   └── ...
├── static                          # 静态资源
│   └── tab                         # tab栏图片
│   └── ...
├── store                           # 状态管理
│   └── modules                     
│       └── app                     # 应用级别状态
│       └── auth                    # 登陆级别状态
│   └── ...
├── styles                          # 样式管理
│   └── aliicon                     # 字体icon
│   └── animation                   # 动画样式
│   └── base                        # 基础公共样式
│   └── border                      # 1px边框
│   └── ...
├── mock-server                     # 数据模块服务
└── yarn.lock
```

## 规范

### 组件
所有组件放置components文件夹下且采用“ - ”连接

### 页面
所有页面放置pages文件夹下分包除外且采用“ _ ”连接

### 素材
所有纯色图标采用阿里icon

### 切片
文件应该遵循的命名规则：
全部小写字母
单词之间使用下划线（_）连接
不使用缩写作为名称

名称	         前缀
Icon	        ic_
MenuIcon	    ic_menu_
TabBarIcon	  ic_tab_
Button	      btn_
RadioButton	  btn_radio_
CheckBox	    btn_check_
Switch	      btn_switch_
Toggle	      btn_toggle_

例如
ic_launcher.png
ic_menu_share.png
ic_menu_back.png
ic_menu_settings.png
ic_tab_home.png
ic_tab_mine.png

