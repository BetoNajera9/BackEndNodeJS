import MongoLib from '../lib/mongo'
export default class MoviesService {
	constructor() {
		this.collection = 'movies'
		this.storage = new MongoLib()
	}

	async getMovies({ tags }) {
		const query = tags && { tags: { $in: tags } }
		const movies = await this.storage.getAll(this.collection, query)
		return movies ?? []
	}

	async getMovie({ movieId }) {
		const movie = await this.storage.get(this.collection, movieId)
		return movie ?? {}
	}

	async createMovie({ movie }) {
		const createMovieId = await this.storage.create(this.collection, movie)
		return createMovieId
	}

	async updateMovie({ movieId, movie } = {}) {
		const updatedMovieId = await this.storage.update(
			this.collection,
			movieId,
			movie
		)
		return updatedMovieId
	}

	async deleteMovie({ movieId }) {
		const deletedMovieId = await this.storage.delete(this.collection, movieId)
		return deletedMovieId
	}
}
