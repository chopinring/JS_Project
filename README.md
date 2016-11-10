# JS_Project 
# 利用js在的第三方网页上加载广告
# 利用自己的路由器拦截第三方网站返回的信息，从而加载自己的js文件
# 并统计相关的数据信息

JsAdsTimer.jar
# Java语言实现，用于统计广告的pv和按钮点击的pv
# 每天整点执行，每天0点执行新增数据行代码
# 通过log4j.properties配置日志信息
# 通过log4j_config.ini设置日志记录的开关

log4j.properties
# 日志配置文件

log4j_config.ini
# 日志开关文件

chopin_default.css
# 广告的样式文件
# z-index设置为最大值 兼容safari

chopin_defined.js
# 识别浏览器类型 安卓微信、ios微信、安卓非微信、ios非微信共四种情况
# 由于跨域的限制，所以js采用jsonp的方式加载：首先定义函数，并动态生成script标签，然后返回函数调用的字符串进行调用。
# 根据页面在相应时间内的滑动次数 显示或者隐藏广告内容
# 设置网站的黑名单功能 黑名单内的网址则不加载广告
# 通过调用getAds.php统计广告加载次数和按钮点击次数
# 加载第三方的统计代码 cnzz和51.la 51.la的js代码通过新建iframe的方式实现

iframeCount.html
# 51.la的空白统计页面
# display为none
# width和height都为0px

getAds.php
# 对数据库进行相关操作
# 根据优先级随机加载广告
# 统计广告加载的次数，即广告的pv；通过参数flagNum确定，flagNum=0
# 统计按钮点击的次数，即button的pv；通过参数flagNum确定，flagNum=1
