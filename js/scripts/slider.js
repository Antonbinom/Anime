const slider = () => {
	const swiper = new Swiper('.swiper', {
		loop: true,

		pagination: {
			el: '.swiper-pagination',
		},

		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},

		effect: 'fade',
		speed: 1000,
	});
}

export default slider;