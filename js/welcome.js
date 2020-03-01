$(function(){
				var access_token = getUrlVal("access_token")
				var show_id = getUrlVal("show_id")
				var day_time = getUrlVal("day_time")
				var uname = getUrlVal("uname")
				console.log(uname)
				console.log(api.scan_code_url)
				console.log(getUrlVal("day_time"))
				console.log(day_time)
				$(".name").find("#name").text( unescape(uname))
				$.ajax({
					url: api.scan_code_url,
					type: "post",
					data: {
						// access_token: access_token,
						// show_id:show_id,
						// day_time:day_time,
						// uname:uname
						access_token: getUrlVal("access_token"),
						show_id:getUrlVal("show_id"),
						day_time:getUrlVal("day_time"),
						uname:getUrlVal("uname")
					},
					timeout: 3000,
					success: function(res) {
						
						let imgUrl = res.data.data
						console.log(imgUrl)
						console.log(res)
						$(".btn_save").attr("href",imgUrl)		
						$(".code").append(`<img style="width:100%;height:100%;" src=${imgUrl} />`)
						
					// 	$(".btn_save").attr("href",imgUrl)
					// 	$(".qrcode_wrapper").append(`<img style="width:100%;height:100%;" src=${imgUrl} />`)
					},
					error: function() {
						console.log("error");
					}
				
				})
			})
			