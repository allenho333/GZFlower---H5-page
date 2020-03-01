baseUrl
https://gzflower.bluej.cn/
#基本接口（默认post请求）

1.进入预约

url：
index/book/book

请求方式 post

请求参数(全部必填)
phone_num 电话号码
13800138001
idcard_num 身份证号
511823198401108350
uname 姓名
randyho 

成功示例

{
	"res": 1,
	"msg": "登录成功",
	-"data": {
	"access_token": "xxx"
	}
}


2.获取预约列表
url
index/choose/chooselist
请求方式 post

请求参数
access_token

成功示例
{
"res": 1,
"msg": "请求成功",
"data": {
 	"list": [
			{
			"day_time": "2019-09-28"
			},
			{
			"day_time": "2019-09-29"
			},
			{
			"day_time": "2019-09-30"
			},
			{
			"day_time": "2019-10-01"
			},
			-{
			"day_time": "2019-10-02"
			},
			{
			"day_time": "2019-10-03"
			},
			{
			"day_time": "2019-10-04"
			},
			{
			"day_time": "2019-10-05"
			},
			{
			"day_time": "2019-10-06"
			},
			-{
			"day_time": "2019-10-07"
			},
			{
			"day_time": "2019-10-08"
			}
	]
 }
}


3.查询某天场次
url
index/choose/chooseday
请求方式 post
请求参数(两个必填)

access_token

day_time(日期)
例如: 2019-09-28        
 	
成功示例
部分参数说明
day_max 当天最大预约量
balance 当天剩余预约量
{
"res": 1,
"msg": "请求成功",
"data": {
"dayInfo": [
{
"day_time": "2019-09-30",
"show_id": 2,
"show_name": "12:00-14:30",
"balance": "500",
"day_max": "500"
},
{
"day_time": "2019-09-30",
"show_id": 3,
"show_name": "14:30-17:00",
"balance": "500",
"day_max": "500"
},
{
"day_time": "2019-09-30",
"show_id": 1,
"show_name": "09:00-12:00",
"balance": "500",
"day_max": "500"
}
]
}
}

4.预约某天场次
url
index/choose/bookday

参数
access_token
day_time	日期
show_id 	场次id

成功示例
{"res":1,"msg":"请求成功","data":{"update_res":[{"day_time":"2019-10-04","show_id":1,"show_name":"09:00-12:00","balance":499,"day_max":"500"}]}}

update_res 更新后的信息


5.获取二维码
url
/index/Qrcode/code

access_token	
show_id          场次id
day_time		  日期
uname            用户名

请求示例
access_token a7617266ee4c29bad48c60RBb2U279de98eb5
show_id		1
day_time	2019-10-06
uname		randyho

成功示例
{"res":1,
"msg":"请求成功",
"data":{
	"data":"data:image\/png;base64,iVBO"  //base64位图片
	}
}
返回参数
data

6.预约记录
url
/index/book/report

参数
$phone_num    手机号
$uname	      用户名

成功示例

{"res":1,"msg":"请求成功","data":{"report":[{"day_time":"0000-00-00","show_id":0}],"uname":"randyho"}}
