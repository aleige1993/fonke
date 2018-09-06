var num = 0;
function toast (str) {
	if ($('.toast').length) {
		$('.toast').html(str);
		return false;
	}
	var html = '<div class="toast num' + num + '">' + str + '</div>';
	$(html).appendTo('body');
	var obj = $('.num' + num);
	setTimeout(function () {
		obj.addClass('show');	
	}, 100);
	setTimeout(function () {
		obj.removeClass('show');
		setTimeout(function () {
			obj.remove();
		}, 1000);
	}, 3000);
}
