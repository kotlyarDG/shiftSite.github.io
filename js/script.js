// Проверка, загрузилась ли страница
$(document).ready(function () {
	$('.header__search-btn').click(function (event) {
		$('.header__search-btn').toggleClass('_disable')
		$('.header__search').toggleClass('_active')
	});


	$(document).mouseup(function (event) {
		if ($('form.header__search').hasClass('_active')) {
			if ($(".header__search").has(event.target).length === 0) {
				$('.header__search-btn').toggleClass('_disable')
				$('.header__search').toggleClass('_active')
			}
		}
	});

});