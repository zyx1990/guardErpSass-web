var token = {
	setToken: function(name, value){		
		var days = 1;
	    var exp = new Date();
	    exp.setTime(exp.getTime() + days * 24 * 60 * 60 * 1000);
	    document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
	},
	readToken: function(name){
		var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
	    if (arr = document.cookie.match(reg)) {
	        return unescape(arr[2]);
	    } else {
	        return null;
	    }
	}
}


export default token;