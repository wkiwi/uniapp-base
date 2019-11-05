<!--
 * @Author: wkiwi
 * @Email: w_kiwi@163.com
 * @Date: 2019-05-31 15:27:44
 * @LastEditors: wkiwi
 * @LastEditTime: 2019-11-05 21:19:09
 -->
# uniapp-base

## 介绍
uniapp脚手架，工程化目录，包含VueX,$bus,请求拦截，node模拟数据后端等

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
├── pages.json
├── manifest.json
├── main.js
├── package.json                    # 引入第三方npm包
├── components                      # 公共 UI 组件
│   └── ...
├── state                           # 状态管理
│   └── ...
├── assets                          # 资源
├── static                          # 图片
│   └── ...
├── pages
│   ├── home                        # 首页示例模板
│   ├── mine                        # 我的示例模板
│   └── ...                         # 示例模板
├── services
│   └── API                         # API 示例模板
├── mock-server                     # 数据模块服务
└── yarn.lock
```

## 规范

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

