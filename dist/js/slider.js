$(document).ready(function() {
	$('.features .slider').slick({
		arrows: true,
		adaptiveHeight: true,
		slidesToShow: 3,
		slidesToScroll: 1,
		easing: 'linear',
		autoplay: true,
		speed: 1000,
		infinite: true,
	});
    $('.around .slider').slick({
		arrows: true,
		adaptiveHeight: true,
		slidesToShow: 4,
		slidesToScroll: 1,
		easing: 'linear',
		autoplay: true,
		speed: 1000,
		infinite: true,
	});
    $('.slick-next.slick-arrow').html(' ');
    $('.slick-prev.slick-arrow').html(' ');
});