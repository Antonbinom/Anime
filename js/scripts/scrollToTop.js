const scrollToTop = () => {
	const toTop = document.getElementById('scrollToTopButton');

	toTop.addEventListener('click', (e) => {
		e.preventDefault();

		seamless.scrollIntoView(document.querySelector(".header"), {
			behavior: "smooth",
			block: "center",
			inline: "center",
		});
	})
};

export default scrollToTop;