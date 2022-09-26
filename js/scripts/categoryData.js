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

	const renderCategories = (genres) => {
		const wrapper = document.querySelector('.product-page .col-lg-8')
		const productBlock = document.createElement('div')

		genres.forEach(genre => {
			productBlock.insertAdjacentHTML('beforeend', `
					<div class= "row" >
						<div class="col-lg-8 col-md-8 col-sm-8">
							<div class="section-title">
								<a href="/categories.html?genre=${genre}" class="primary-btn"><h4>${genre}</h4></a>
							</div>
						</div>
					</div>
				`)
			wrapper.append(productBlock)
		})

		document.getElementById('preloder').classList.remove('active')

	}

	const renderCategoryItems = (anime, genre) => {
		const wrapper = document.querySelector('.product-page .col-lg-8')
		const productBlock = document.createElement('div')
		const listBlock = document.createElement('div')
		const list = anime.filter(item => item.tags.includes(genre))

		listBlock.classList.add('row')

		productBlock.insertAdjacentHTML('beforeend', `
				<div class= "row" >
					<div class="col-lg-8 col-md-8 col-sm-8">
						<div class="section-title">
							<h4>${genre}</h4>
						</div>
					</div>
				</div>
			`)

		list.forEach(item => {
			const tagsBlock = document.createElement('ul')
			item.tags.forEach(tag => {
				tagsBlock.insertAdjacentHTML('beforeend', `
						<a href="/categories.html?genre=${tag}"">
							<li> ${tag}</li>
						</a>
					`)
			})
			listBlock.insertAdjacentHTML('beforeend', `
					<div div class="col-lg-4 col-md-6 col-sm-6" >
						<div class="product__item">
							<div class="product__item__pic set-bg" data-setbg="${item.image}">
								<div class="ep"> ${item.rating} / 10</div>
								<div class="view"><i class="fa fa-eye"></i> ${item.views}</div>
							</div>
							<div class="product__item__text">
								${tagsBlock.outerHTML}
								<h5><a href="/anime-details.html?itemId=${item.id}">${item.title}</a></h5>
							</div>
						</div>
					</div>
				`)
		})

		wrapper.append(productBlock)
		wrapper.append(listBlock)

		wrapper.querySelectorAll('.set-bg').forEach(elem => {
			elem.style.backgroundImage = `url(${elem.dataset.setbg})`
		})

		renderBreadcrumbs(genre)

	}

	const renderTop = (top) => {
		const wrapper = document.querySelector('.filter__gallery')

		top.forEach(item => {
			wrapper.insertAdjacentHTML('beforeend', `
				<div class="product__sidebar__view__item set-bg mix" data-setbg="${item.image}" >
					<div class="ep">${item.rating} / 10?</div>
					<div class="view"><i class="fa fa-eye"></i>${item.views}</div>
					<h5><a href="/anime-details.html?itemId=${item.id}">${item.title}</a></h5>
				</div>
			`)
		})

		wrapper.querySelectorAll('.set-bg').forEach(elem => {
			elem.style.backgroundImage = `url(${elem.dataset.setbg})`
		})

		document.getElementById('preloder').classList.remove('active')
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
		const topList = data.anime.sort((a, b) => b.views - a.views).slice(0, 5)
		const genreParams = new URLSearchParams(window.location.search).get('genre')

		data.anime.forEach(item => {
			genres.add(item.ganre)
		})

		if (genreParams) {
			renderCategoryItems(data.anime, genreParams)
		} else renderCategories(genres)

		renderTop(topList)
		renderDropdownCategories(genres)

	})
		.catch(error => console.log(error.message))
}

export default categoryData