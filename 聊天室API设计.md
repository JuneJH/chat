# 聊天室API设计

> 基于HTTP请求 socket


## 1. 注册

url:/user/register
method:POST

参数

| 参数     | 类型   | 备注   |
| -------- | ------ | ------ |
| username | string | 用户名 |
| password | string | 密码   |


## 2. 登录

url:/api/login
method:GET

参数

| 参数     | 类型   | 备注   |
| -------- | ------ | ------ |
| username | string | 用户名 |
| password | string | 密码   |

响应

## 3. 创建房间

url:/api/room/add
method:POST

| 参数     | 类型   | 备注   |
| -------- | ------ | ------ |
| username | string | 用户名 |
| password | string | 密码   |


## 4.获取聊天房间

url:/api/getRoom
method:GET

参数:无

响应

| 字段 | 类型 | 备注 |
| ---- | ---- | ---- |

## 5. 获取房间消息

url:/api/getMessage/:room_id
mehode:GET





