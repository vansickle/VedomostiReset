function extrapolateUrlFromCookie(cookie) {
    var prefix = cookie.secure ? "https://" : "http://";
    if (cookie.domain.charAt(0) == ".")
        prefix += "www";

    return prefix + cookie.domain + cookie.path;
}


function resetVedomosti() {

  chrome.cookies.getAll({domain:"vedomosti.ru"}, function(cookies_arr){
  	console.log("Vedomosti Reset Called");

  	for (var i = cookies_arr.length - 1; i >= 0; i--) {
  		var cookie = cookies_arr[i]

  		if(cookie.name.indexOf("popup")!=-1) //do not reset cookie for popup add
  			continue;

  		if(cookie.name.indexOf("ved_fullscreen")!=-1) //do not reset cookie for popup add
  			continue;

  		console.log("removing cookie:"+cookie.name);
  		chrome.cookies.remove({name:cookie.name, url: extrapolateUrlFromCookie(cookie), storeId: cookie.storeId}, function(cookie){});
  	};


  })

}

chrome.browserAction.onClicked.addListener(resetVedomosti); 