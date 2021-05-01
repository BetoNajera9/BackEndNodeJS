import MongoLib from '../lib/mongo'
import bcrypt from 'bcrypt'

export default class UsersService {
	constructor() {
		this.collection = 'users'
		this.store = new MongoLib()
	}

	async getUsers(tags) {
		const query = tags
		const users = await this.store.getAll(this.collection, query)
		return users ?? []
	}

	async getUser(userId) {
		const movie = await this.store.get(this.collection, userId)
		return movie ?? {}
	}

	async createUser(user) {
		const { name, email, password } = user
		const hashedPassword = await bcrypt.hash(password, 10)

		const createUserId = await this.store.create(this.collection, {
			name,
			email,
			password: hashedPassword,
		})

		return createUserId
	}
}
