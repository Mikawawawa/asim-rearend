### 使用方法

安装依赖

```
npm install
```

前台运行，并在浏览器中访问索引页

```
npm run dev
```

使用 forever 后台运行

```
npm run serve
```

> forever 安装方式
>
> ```
> npm install forever -g
> ```

### 配置文件说明

- static：静态文件目录
- port：监听端口
- mode：最终以哪端文件为准，
- db：数据库配置
  - host：服务器 ip
  - user：登陆 user
  - password：密码
  - database：数据库名
- mail：发送邮件的账号
- cos：腾讯云对象存储配置
