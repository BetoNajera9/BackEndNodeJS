import MongoLib from '../lib/mongo'

export default class UserMoviesService {
	constructor() {
		this.collection = 'user-movies'
		this.store = new MongoLib()
	}

	async getUsersMovies({ tags }) {
		const query = tags && { tags: { $in: tags } }
		const userMovies = await this.store.getAll(this.collection, query)

		return userMovies ?? []
	}

	async createUserMovies(userId) {
		const movie = await this.store.get(this.collection, userId)
		return movie ?? {}
	}

	async deleteUserMovie({ userMovieId }) {
		const deletedUserMovieId = await this.store.delete(
			this.collection,
			userMovieId
		)

		return deletedUserMovieId
	}
}
