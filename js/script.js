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

	$('.item-answer__title').click(function (event) {
		$('.item-answer__title').not($(this)).removeClass('_active');
		$('.item-answer__text').not($(this).next()).slideUp(300);

		$(this).toggleClass('_active').next().slideToggle(300);
	});
	$('.item-info').hide();
	var cat = $('.cases__item._active').data('filter');
	$('.item-info.f_' + cat).show();

	$('.cases__item').click(function (event) {
		var cat = $(this).data('filter');

		// Присвоение ссылке класса active-filter
		$('.cases__item._active').removeClass('_active')
		$(this).addClass('_active')

		// При категории 1 - показывает все элементы с классом filter__item
		// В ином случае показывает элементы с классом f_ + номер категории

		$('.item-info').hide();
		$('.item-info.f_' + cat).fadeToggle();
	});


});