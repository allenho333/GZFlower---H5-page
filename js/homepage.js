// <script src="https://unpkg.com/sweetalert/dist/sweetalert.min.js"></script>
// import swal from 'sweetalert';

let record_btn = $(".requestRecord");
let appoint_btn = $(".appoint");
// let name = $(".name")[0].value
// let phone = $(".phone")[0].value
// let id = $(".id")[0].value
let name;
let phone;
let id;
let access_token;
let day_time;
//我要预约的点击时间
appoint_btn.click(function(obj) {

	name = $(".name")[0].value;
	// name = "randyho";
	phone = $(".phone")[0].value;
	id = $(".id")[0].value;
	let book_url = "https://gzflower.bluej.cn/index/book/book"
	if (!name || !phone || !id) {
		$(".notice").text("内容不能为空").css("visibility", "visible")
		// swal("内容不能为空")
		return
	}
	if (!isPoneNum(phone)) {
		$(".notice").text("内容不能为空").css("visibility", "visible")
		
		return
	}
	if (!checkIDCard(id)) {
		$(".notice").text("内容不能为空").css("visibility", "visible")
		
		return
	}
	//数据上报
	MtaH5.clickStat('login',{'uname':JSON.stringify(name), 'phone_num':JSON.stringify(phone)})

	$.ajax({
		url: book_url,
		type: "post",
		data: {
			phone_num: phone,
			idcard_num: id,
			uname: name
		},
		// data: {
		// 	phone_num: 13800138001,
		// 	idcard_num: 511823198401108350,
		// 	uname: "randyho"
		// },
		timeout: 3000,
		success: function(res) {
			
			access_token = res.data.access_token;
			location.href = "selection.html" + "?" + "access_token" + "=" + access_token + "&" + "uname" + "=" + escape(name) 
			// + "?" + "uname" + "=" + name
		},
		error: function() {
			console.log("error");
		}
	})

})

//预约历史的点击时间
record_btn.click(function(ele) {
	
	name = $(".name")[0].value;
	// name = "randyho";
	phone = $(".phone")[0].value;
	id = $(".id")[0].value;
	// console.log("1")
	//check the input
	if (!name || !phone || !id) {
		swal("内容不能为空")
		return
	}
	if (!isPoneNum(phone)) {
		swal("电话号码不正确")
		return
	}
	if (!checkIDCard(id)) {
		swal("身份证号码不正确 ")
		return
	}
	// console.log(ele);
	//receive value from input
	uname = $(".name")[0].value;
	phone_num = $(".phone")[0].value;
	id = $(".id")[0].value;
	let record_url = api.record_url

	// to get the token first
	$.ajax({
		url: api.book_url,
		type: "post",
		data: {
			phone_num:phone_num,
			idcard_num:id,
			uname: uname
		},
		// data: {
		// 	phone_num: 13800138001,
		// 	idcard_num: 511823198401108350,
		// 	uname: "randyho"
		// },
		timeout: 3000,
		success: function(res) {
			console.log(res);
			access_token = res.data.access_token;
		},
		error: function() {
			console.log("error");
		}
	})
	//turn to page depending on record
	$.ajax({
		url: api.record_url,
		type: "post",
		data: {
			phone_num:phone,
			idcard_num:id,
			uname: name
		},
		// data: {
		// 	phone_num: 13800138001,
		// 	uname: "randyho"
		// },
		timeout: 3000,
		success: function(res) {
			uname = escape(uname)
			console.log(res.data.report);
			if (!res.data.report) {
				location.href = "record.html" + "?" + "access_token" + "=" + access_token + "&" + "phone_num" + "=" +
					phone_num + "&" + "uname" + "=" +escape(uname)  ;
					// + "&" + "day_time" + day_time
			} else {
				location.href = "mine.html" + "?" + "access_token" + "=" + access_token + "&" + "phone_num" + "=" + phone_num +
					"&" + "uname" + "=" +escape(uname) ;
					// + "&" + "day_time" + day_time
			}
		},
		error: function() {
			console.log("error");
		}
	});
})
