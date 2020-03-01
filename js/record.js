let access_token = getUrlVal("access_token")
let phone_num = getUrlVal("phone_num")
let uname = getUrlVal("uname")
$.ajax(({
			url: api.record_url,
			type: "post",
			// data: {
			// 	phone_num:phone,
			// 	idcard_num:id,
			// 	uname: name
			// },
			data: {
				phone_num: 13800138001,
				uname: "randyho"
			},
			timeout: 3000,
			success: function(res) {
				console.log(res);
				access_token = res.data.access_token;
	
				// location.href = "record.html" + "?" + "access_token" + "=" + access_token
	
			},
			error: function() {
				console.log("error");
			}
		})
;
})
