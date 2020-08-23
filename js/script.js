// Проверка, загрузилась ли страница
$(document).ready(function () {

	$('.personal-solution__items').slick({
		arrows: true,
		slidesToScroll: 1,
		slidesToShow: 5,
		responsive: [

			{
				breakpoint: 900,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 2,
					arrows: false
				}
			},
			{
				breakpoint: 480,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
					arrows: false
				}
			}
			// You can unslick at a given breakpoint now by adding:
			// settings: "unslick"
			// instead of a settings object
		]
	});

	$('.header__burger').click(function (event) {
		$('.header__burger,.burger__menu').toggleClass('_active')
		$('body').toggleClass('_lock')
	});

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

	$('.rates__items--year').fadeOut(300);

	$('.selector-rates__item--month').click(function (event) {
		if (!$(this).hasClass('_active')) {
			$('.selector-rates__item').toggleClass('_active');
			$('.rates__items--year').fadeToggle(300);
			$('.rates__items--month').fadeToggle(300);
		}
	});
	$('.selector-rates__item--year').click(function (event) {
		if (!$(this).hasClass('_active')) {
			$('.selector-rates__item').toggleClass('_active');
			$('.rates__items--month').fadeToggle(300);
			$('.rates__items--year').fadeToggle(300);
		}
	});

	$(document).on('click', '.class-link', function () {
		var linkID = $(this).attr('href');
		$('html, body').animate({
			scrollTop: $(linkID).offset().top
		}, 'slow');
	});

	$(document).on('click', '.burger-link', function () {
		var linkID = $(this).attr('href');
		$('.header__burger,.burger__menu').toggleClass('_active');
		$('body').toggleClass('_lock');
		$('html, body').animate({
			scrollTop: $(linkID).offset().top
		}, 'slow');
	});

	const popupLinks = document.querySelectorAll('.popup-link');
	const body = document.querySelector('body');
	const lockPadding = document.querySelectorAll('.lock-padding');
	const video = document.querySelector('.video-youtube');

	let unlock = true;

	// timeout - время анимации в css
	const timeout = 880;

	if (popupLinks.length > 0) {
		for (let index = 0; index < popupLinks.length; index++) {
			const popupLink = popupLinks[index];
			popupLink.addEventListener("click", function (e) {
				const popupName = popupLink.getAttribute('href').replace('#', '');
				const currentPopup = document.getElementById(popupName);
				popupOpen(currentPopup);
				e.preventDefault();
			});
		}
	}

	const popupCloseIcon = document.querySelectorAll('.close-popup');
	if (popupCloseIcon.length > 0) {
		for (let index = 0; index < popupCloseIcon.length; index++) {
			const el = popupCloseIcon[index];
			el.addEventListener('click', function (e) {
				popupClose(el.closest('.popup'));
				e.preventDefault();
			});
		}
	}

	function popupOpen(currentPopup) {
		if (currentPopup && unlock) {
			const popupActive = document.querySelector('.popup.open');
			if (popupActive) {
				popupClose(popupActive, false);
			} else {
				bodyLock();
			}
			currentPopup.classList.add('open');
			video.setAttribute('src', 'https://www.youtube.com/embed/9lO06Zxhu88');
			currentPopup.addEventListener('click', function (e) {
				if (!e.target.closest('.popup__content')) {
					popupClose(e.target.closest('.popup'));
				}
			});
		}
	}

	function popupClose(popupActive, doUnlock = true) {
		if (unlock) {
			popupActive.classList.remove('open');
			video.setAttribute('src', '');
			if (doUnlock) {
				bodyUnlock();
			}
		}
	}


	function bodyLock() {
		// const lockPaddingValue = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';

		// if (lockPadding.length > 0) {
		// 	for (let index = 0; index < lockPadding.length; index++) {
		// 		const el = lockPadding[index];
		// 		el.style.paddingRight = lockPaddingValue;
		// 	}
		// }
		// body.style.paddingRight = lockPaddingValue;
		body.classList.add('_lock');

		unlock = false;
		setTimeout(function () {
			unlock = true;
		}, timeout);
	}

	function bodyUnlock() {
		setTimeout(function () {
			for (let index = 0; index < lockPadding.length; index++) {
				const el = lockPadding[index];
				el.style.paddingRight = '0px';
			}
			body.style.paddingRight = '0px';
			body.classList.remove('_lock');
		}, timeout);

		unlock = false;
		setTimeout(function () {
			unlock = true;
		}, timeout);
	}

	document.addEventListener('keydown', function (e) {
		if (e.which === 27) {
			const popupActive = document.querySelector('.popup.open');
			popupClose(popupActive);
		}
	});

	(function () {
		// проверяем поддержку
		if (!Element.prototype.closest) {
			// реализуем
			Element.prototype.closest = function (css) {
				var node = this;
				while (node) {
					if (node.matches(css)) return node;
					else node = node.parentElement;
				}
				return null;
			};
		}
	})();
	(function () {
		// проверяем поддержку
		if (!Element.prototype.matches) {
			// определяем свойства
			Element.prototype.matches = Element.prototype.matchesSelector ||
				Element.prototype.webkitMatchesSelector ||
				Element.prototype.mozMatchesSelector ||
				Element.prototype.msMatchesSelector;
		}
	})();

	$('.body-crm__slider-fade').slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		prevArrow: $('.body-crm__arrow--prev'),
		nextArrow: $('.body-crm__arrow--next'),
		fade: true,
		asNavFor: '.body-crm__slider'
	});
	$('.body-crm__slider').slick({
		slidesToShow: 3,
		slidesToScroll: 1,
		asNavFor: '.body-crm__slider-fade',
		centerMode: true,
		focusOnSelect: true,
		arrows: false,
		responsive: [

			{
				breakpoint: 991,
				settings: {
					slidesToShow: 2,
					arrows: false
				}
			},
			{
				breakpoint: 480,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
					arrows: false
				}
			}
			// You can unslick at a given breakpoint now by adding:
			// settings: "unslick"
			// instead of a settings object
		]
	});

});