let appoint_url = "https://gzflower.bluej.cn/" + "index/choose/chooselist"
let access_token = getUrlVal("access_token")
//return if not login
if (!access_token) {
	alert("请登录")
	location.href = "http://127.0.0.1:8848/20200225appointment%20system/html/homepage.html"
}
more_btn = $(".more")
selections = $(".option")
times = $(".time")
availables = $(".available")
$.ajax({
	url: appoint_url,
	type: "post",
	data: {
		// access_token:a7617266ee4c29bad48c60jntGE279de98eb5
		access_token: access_token
	},
	timeout: 3000,
	success: function(res) {
		console.log(res)
		console.log(access_token)
		loadData(res)
		refreshToday()

	},
	error: function() {
		console.log("error");
	},

})

//点击后展开数据
more_btn.click(function() {
	console.log("more")
	selections = $(".option")
	selections.removeClass("option")
})

//给数据增加店家时间
selections.click(function(ele) {
	selections.removeClass("option active")
	selections.addClass("option")
	$(this).addClass("active")

})

//将日期添加上去
function loadData(res) {
	let selections = document.querySelector(".select")
	res.data.list.forEach(function(ele) {
		let div = document.createElement("div")
		let y = ele.day_time.slice(0, 4)
		let m = ele.day_time.slice(5, 7)
		let d = ele.day_time.slice(8, 10)
		let date = `${m}月${d}日`
		div.innerHTML = `${date}`
		div.classList.add("option")
		selections.appendChild(div)

	})
	//展示第一个数据
	selections.children[0].classList.add("active")
	refreshToday()
	// res.data.list.forEach(function(ele) {
	// 	console.log(token)
	// 	console.log(ele.day_time)
	// 	let check_url = base_url + "index/choose/chooseday"
	// 	$.ajax({
	// 		url: check_url,
	// 		type: "post",
	// 		data: {
	// 			access_token: token,
	// 			day_time: ele.day_time
	// 		},
	// 		success: function(ele) {
	// 			console.log(ele)
	// 		}

	// 	})
	// })
	//添加点击事件,点击显示
	selections = $(".option")
	selections.click(function(ele) {
		selections.removeClass("option active")
		selections.addClass("option")
		$(this).addClass("active")
		refreshToday()
	})
}

//根据当前日期显示当前可预约日期
let isClick = true
function refreshToday() {
	if ($(".option.active").eq(0)[0].classList.value.includes("empty")) {
		for (let n = 1; n < 4; n++) {
			$("table tr").eq(n)["0"].cells["0"].innerHTML = "-"
			$("table tr").eq(n)["0"].cells["1"].innerHTML = "-"
		}

		return
	}
	let uname = getUrlVal("uname")
	console.log(uname)
	console.log(escape(uname))
	
	//还原时间格式
	let m = $(".option.active").text().slice(0, 2)
	let d = $(".option.active").text().slice(3, 5)
	let date = `2019-${m}-${d}`
	$.ajax({
		url: "https://gzflower.bluej.cn/index/choose/chooseday",
		type: "post",
		data: {
			access_token: access_token,
			day_time: date
		},
		success: function(res) {
			let n = 1
			res.data.dayInfo.forEach(function(ele) {
				//update table cell
				console.log(ele)
				$("table tr").eq(n)["0"].cells["0"].innerHTML = ele.show_name
				$("table tr").eq(n)["0"].cells["1"].innerHTML = ele.balance === 0 ? "已约满" : "可预约",
					$("table tr").eq(n).attr("show_id", ele.show_id)
				n++
			})

			var alert_wrapper = $(".alert_wrapper")
			var alert_btn_cancel = $(".alert_btn_cancel")
			var alert_btn_confirm = $(".alert_btn_confirm")
			var alert_content = $(".alert_content")

			alert_btn_cancel.click(function(ele) {
				isClick = true
				alert_wrapper.hide()
			})
			//add eventlistener
			availables.on("click", function(ele) {
				let index = ele.target.attributes.index.value
				if (ele.target.innerText == "已约满") {
					isClick = true
					return

				} else if (isClick == false) {
					return
				} else if (ele.target.innerText == "可预约") {
					
					isClick = false
					let isBook = false;
					let t = times[index].innerText
					let day_time = date
					let show_id = ele.target.parentNode.getAttribute("show_id")
					//double confirm if want to book
					let toBook = "温馨提示," + "是否预约" + day_time + "场次" + t;
					alert_btn_cancel.show()
					alert_btn_confirm.show()
					alert_wrapper.show()
					alert_content.html(toBook)

					alert_btn_confirm.one("click", function() {
						isBook = true;
						alert_wrapper.hide()
						isClick = true
						if (isBook) {
							$.ajax({
								url: api.appoint_url,
								type: "post",
								data: {
									access_token: access_token,
									day_time: day_time,
									show_id: show_id
								},
								success: function(ele) {
									console.log(ele)
									//如无记录 返回
									if (ele.res == 0) {
										isClick = true
										alert_wrapper.find(".alert_content").html("预约失败,当天只能预约一场")
										alert_btn_cancel.hide()
										alert_btn_confirm.hide()
										alert_wrapper.show()
										// MtaH5.clickStat('book_success',{'booktime': JSON.stringify(day_time +" + " + show_id) })
										setTimeout(function() {
											alert_wrapper.find(".alert_content").html("预约失败,当天只能预约一场")
											alert_wrapper.hide()
										}, 2500)
										// location.href = "welcome.html" + "?" + "access_token" + "=" + access_token + "&" + "uname" + "=" + escape(uname)+ "&" + "show_id" + "=" + show_id + "&" + "day_time" + "=" + day_time + "&" + "show_id" + "=" + show_id;
									} else {
										//如果you记录
										isClick = true
										
										// MtaH5.clickStat('book_success',{'booktime': JSON.stringify(day_time + show_id) })
										MtaH5.clickStat('book_success',{'booktime': JSON.stringify(day_time +" + " + show_id) })
										location.href = "welcome.html" + "?" + "access_token" + "=" + access_token + "&" + "uname" + "=" + escape(uname)+ "&" + "show_id" + "=" + show_id + "&" + "day_time" + "=" + day_time + "&" + "show_id" + "=" + show_id;
// 			console.log("welcome.html" + "?" + "access_token" + "=" + access_token + "&" + "uname" + "=" +
// escape(uname) + "&" + "show_id" + "=" + show_id + "&" + "day_time" + "=" + day_time + "&" + "show_id" + "=" + show_id)
											
									}
								}
							})
						}

					})
				}
			})

		}

	})
}
