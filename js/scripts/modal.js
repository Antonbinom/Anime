const modal = () => {
	const modal = document.querySelector('.search-model');
	const searchBtn = document.querySelector('.icon_search');
	const closeBtn = document.querySelector('.icon_close');
	const searchInput = document.getElementById('search-input');

	searchBtn.addEventListener('click', (e) => {
		e.preventDefault();
		modal.style.display = 'block';
	})

	closeBtn.addEventListener('click', (e) => {
		modal.style.display = 'none';
		searchInput.value = '';
	})
}

export default modal;