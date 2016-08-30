$(function(){
	$('#login-form').on('submit', function(evt){
		var username = $(this).find("#username").val();
		var password = $(this).find("#password").val();
			$.ajax({
			  type :   "post",
			  url :   '/api/v1/user/login',
			  data :  JSON.stringify({
			    "username": username,
			    "password": password
			  }),
			  dataType: 'json',
			  contentType :   "application/json",
			  success :   function(result)  {
			    var expiredDate;
			    if(result.success){
			      expiredDate = new Date();
			      expiredDate.setTime(new Date().getTime() + result.data.expiryDate * 24 * 60 * 60 * 1000)
			      document.cookie = result.data.cookieKey + "=" + result.data.accessToken + "; expires=" + expiredDate;
			      window.location.href = "/#/home";
			    }
			  }
			});
			return false;
	});
});