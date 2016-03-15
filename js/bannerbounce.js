function floatUp(){
	$(".banner-title").css("top","42px");
	setTimeout(function(){
		floatDown();
	},1000);
}

function floatDown(){
	$(".banner-title").css("top","52px");
	setTimeout(function(){
		floatUp();
	},1000);
}

$(document).ready(function() {
	floatUp();
	 //$(document).prop('title', "HELLO");
});