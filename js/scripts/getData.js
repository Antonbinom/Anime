const getData = (db) => {
	const getData = async (url) => {
		try {
			const response = await fetch(url)
			const anime = await response.json()
			return anime
		} catch (error) {
			throw new Error(error.message)
		}
	}
	getData(db).then(data => data.anime)
		.catch(error => console.log(error.message))
}
export default getData;