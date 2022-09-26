const mainData = (db) => {

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

	const renderCategories = (anime, genres) => {
		const wrapper = document.querySelector('.product .col-lg-8')

		genres.forEach(genre => {
			const productBlock = document.createElement('div')
			const listBlock = document.createElement('div')
			const list = anime.filter(item => item.ganre === genre)

			productBlock.classList.add('mb-5')
			listBlock.classList.add('row')

			productBlock.insertAdjacentHTML('beforeend', `
				<div class= "row" >
					<div class="col-lg-8 col-md-8 col-sm-8">
						<div class="section-title">
							<h4>${genre}</h4>
						</div>
					</div>
					<div class="col-lg-4 col-md-4 col-sm-4">
						<div class="btn__all">
							<a href="/categories.html?genre=${genre}" class="primary-btn">View All <span class="arrow_right"></span></a>
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
		})
	}

	const renderTop = (top) => {
		const wrapper = document.querySelector('.filter__gallery')

		top.forEach(item => {
			wrapper.insertAdjacentHTML('beforeend', `
				<div class="product__sidebar__view__item set-bg mix" data-setbg="${item.image}" >
					<div class="ep">${item.rating} / 10?</div>
					<div class="view"><i class="fa fa-eye"></i>${item.views}</div>
					<h5><a href="/anime-details.html">${item.title}</a></h5>
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

		data.anime.forEach(item => {
			genres.add(item.ganre)
		})

		renderTop(topList)
		renderCategories(data.anime, genres)
		renderDropdownCategories(genres)

	})
		.catch(error => console.log(error.message))

}

export default mainData