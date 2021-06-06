# 聊天室API设计

> 基于HTTP请求 socket

## 基本交互数据格式

### 1. http交互

```javascript

{
    code:xxx,
    msg:stirng,
    data:[]
}

```

### 2. websocket


## 1. 注册

url:/user/register
method:POST

参数

| 参数     | 类型   | 备注            |
| -------- | ------ | --------------- |
| username | string | 用户名          |
| password | string | 密码            |
| nickname | string | 昵称            |
| email    | string | 邮箱            |
| hobby    | string | 爱好,座右铭     |
| avatar   | string | 头像            |
| sex      | number | 性别:0:女 1: 男 |
| phone    | string | 电话号码        |


## 2. 登录

url:/user/login
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

| 参数             | 类型   | 备注     |
| ---------------- | ------ | -------- |
| room_name        | string | 房间名字 |
| create_person    | string | 创建人   |
| create_person_id | string | 创建人ID |
| room_avatar      | string | 房间头像 |


## 4.通过用户Id获取聊天房间

url:/api/getRoom4userId
method:GET

参数:
| 参数    | 类型   | 备注   |
| ------- | ------ | ------ |
| user_id | string | 用户ID |

响应

## 5.通过房间ID获取用户列表

url:/api/getUser4roomId
method:GET

参数:

| 参数    | 类型   | 备注   |
| ------- | ------ | ------ |
| room_id | string | 房间ID |

## 6. 获取房间历史消息

url:/api/getMessage/:room_id
mehode:GET

参数:

| 参数 | 类型   | 备注       |
| ---- | ------ | ---------- |
| page | number | 当前页码   |
| size | number | 当前页容量 |





