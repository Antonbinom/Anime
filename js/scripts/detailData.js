const categoryData = (db) => {

	const renderDropdownCategories = (genres) => {
		const dropdownMenu = document.querySelector('.header__menu .dropdown')
		genres.forEach(genre => {
			dropdownMenu.insertAdjacentHTML('beforeend', `
				<li>
					<a href="./categories.html?genre=${genre}">${genre}</a>
				</li>
			`)
		})
	}

	const renderBreadcrumbs = (genre) => {
		const breadcrumbs = document.querySelector('.breadcrumb__links')
		const genreText = document.createElement('span')
		genreText.insertAdjacentHTML('afterbegin', `<span>${genre}</span>`)
		breadcrumbs.append(genreText)
	}

	const renderDetails = (anime, genres, id) => {
		const wrapper = document.querySelector('.anime__details__content')
		const productBlock = document.createElement('div')
		productBlock.classList.add('row')

		const animeItem = anime.find(item => item.id == id)

		productBlock.insertAdjacentHTML('beforeend', `
					<div class="col-lg-3">
						<div class="anime__details__pic set-bg" data-setbg="${animeItem.image}">
							<div class="view"><i class="fa fa-eye"></i>${animeItem.views} </div>
						</div>
					</div>
					<div class="col-lg-9">
						<div class="anime__details__text">
							<div class="anime__details__title">
								<h3>${animeItem.title}</h3>
								<span>${animeItem.title}</span>
							</div>

							<p>${animeItem.description}</p>
							<div class="anime__details__widget">
								<div class="row">
									<div class="col-lg-6 col-md-6">
										<ul>
											<li><span>Date aired:</span> ${animeItem.date}</li>
											<li><span>Status:</span> ${animeItem.ganre}</li>
											<li><span>Genre:</span> ${animeItem.tags.join(', ')}</li>
										</ul>
									</div>
									<div class="col-lg-6 col-md-6">
									</div>
								</div>
							</div>
						</div>
					</div>
				`)

		wrapper.append(productBlock)
		wrapper.querySelectorAll('.set-bg').forEach(elem => {
			elem.style.backgroundImage = `url(${elem.dataset.setbg})`
		})
		renderBreadcrumbs(animeItem.ganre)
	}

	const getData = async (url) => {
		try {
			const response = await fetch(url)
			const anime = await response.json()
			return anime
		} catch (error) {
			throw new Error(error.message)
		}
	}

	getData(db).then(data => {
		const genres = new Set()
		const idParams = new URLSearchParams(window.location.search).get('itemId')

		data.anime.forEach(item => {
			genres.add(item.ganre)
		})
		if (idParams) {
			renderDetails(data.anime, genres, idParams)
			renderDropdownCategories(genres)
		} else console.log('Ошибка');
		document.getElementById('preloder').classList.remove('active')

	})
		.catch(error => console.log(error.message))
}

export default categoryData