$(function(){
	let access_token = getUrlVal("access_token")
	let phone_num = getUrlVal("phone_num")
	let uname = getUrlVal("uname")
	let shows = {
		"1" : "09:00-12:00",
		"2" : "12:00-14:30",
		"3" : "14:30-17:00"
	}
	
	let ids = {
		"09:00-12:00" : "1",
		"12:00-14:30" : "2",
		"14:30-17:00" :"3"
	}
	
	$.ajax({
		url: api.record_url,
		type: "post",
		data: {
			phone_num:phone_num,
			// idcard_num:id,
			uname: uname
		},
		// data: {
		// 	phone_num: 13800138001,
		// 	uname: "randyho"
		// },
		timeout: 3000,
		success: function(res) {
			console.log(res);	
			let name = $(".name>span").eq(0)
			document.querySelector(".name>span").innerText = unescape(res.data.uname) 
			
			//将结果写入到hrml
			let times = res.data.report.map(function(ele){	
				let show_id = String(ele.show_id) 
				return shows[show_id];
			})
			let day_times = res.data.report.map(function(ele){
				 
				return ele.day_time;
			})
			
			// console.log(times)
			let times_div = ""
			let index = 0
			console.log(day_times)
			times.forEach(function(ele){
				// console.log(index)
				
				let temp = `
				<div class = "booked_date">
				<div class="time">日期：<span>${day_times[index]}</span></div>
				<div class = "show" day_time = "${day_times[index]}" data_index = "${index}" show_id = "${ids[ele]}"><p>场次：${ele}</p></div>
				</div>
				`
				times_div = times_div + temp
				index++
			})
			
			document.querySelector(".time").innerHTML = times_div;
			$(".time").on("click",".booked_date",function(event){
				// console.log($(event.target))
				// console.log($(event.target).attr("show_id"))
				console.log($(event.target).parent().attr("show_id"))
				console.log($(event.target).parent().parent().find(".show").attr("show_id"))
				console.log($(event.target).parent().parent().find(".show").attr("day_time"))
				// let show_id = $(event.target).parent().attr("show_id")
				let show_id = $(event.target).parent().parent().find(".show").attr("show_id")
				// let day_time = $(event.target).parent().attr("day_time")
				let day_time = $(event.target).parent().parent().find(".show").attr("day_time")
				location.href = "welcome.html" + "?" + "access_token" + "=" + access_token + "&" + "uname" + "=" + escape(uname) + "&" + "show_id" + "=" + show_id + "&" + "day_time" + "=" + day_time ;
				// $.ajax({
					
				// })
			})
			console.log($(".booked_date"))
		},
		error: function() {
			console.log("error");
		}
	})
})





