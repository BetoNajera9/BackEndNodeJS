import MongoLib from '../lib/mongo'

export default class ApiKeyServices {
	constructor() {
		this.collection = 'api-keys'
		this.mongoDB = new MongoLib()
	}

	async getApiKey({ token }) {
		const [apikey] = await this.mongoDB.getAll(this.collection, { token })
		return apikey
	}
}
