const preloader = () => {
	const preloader = document.getElementById('preloder')

	preloader.classList.add('active')

	setTimeout(() => {
		preloader.classList.remove('active')
	}, 500)
}

export default preloader;