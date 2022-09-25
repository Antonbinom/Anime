const bgElements = () => {
	const elements = document.querySelectorAll('.set-bg');

	elements.forEach(elem => {
		const src = elem.dataset.setbg;
		elem.style.backgroundImage = `url(../${src})`;
	})
};

export default bgElements;