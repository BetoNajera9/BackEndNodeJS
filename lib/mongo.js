import { MongoClient, ObjectId } from 'mongodb'
import config from '../config'

const USER = encodeURIComponent(config.mongo.user)
const PASSWORD = encodeURIComponent(config.mongo.password)
const HOST = config.mongo.host
const DB_NAME = config.mongo.name

const MONGO_URI = `mongodb+srv://${USER}:${PASSWORD}@${HOST}/${DB_NAME}?retryWrites=true&w=majority`

export default class MongoLib {
	constructor() {
		this.client = new MongoClient(MONGO_URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		})
		this.dbName = DB_NAME
	}

	async connect() {
		try {
			if (!MongoLib.connection) {
				await this.client.connect()
				console.log(`Connected succesfully to ${DB_NAME}`)
				MongoLib.connection = this.client.db(this.dbName)
			}
			return MongoLib.connection
		} catch (err) {
			console.error(err)
		}
	}

	async getAll(collection, query) {
		try {
			const db = await this.connect()
			return await db
				.collection(collection)
				.find(query)
				.toArray()
		} catch (err) {
			console.error(err)
		}
	}

	async get(collection, id) {
		try {
			const db = await this.connect()
			return db.collection(collection).findOne({ _id: ObjectId(id) })
		} catch (err) {
			console.error(err)
		}
	}

	async create(collection, data) {
		try {
			const db = await this.connect()
			return db.collection(collection).insertOne(data)
		} catch (err) {
			console.error(err)
		}
	}

	async update(collection, id, data) {
		try {
			const db = await this.connect()
			return db
				.collection(collection)
				.updateOne({ _id: ObjectId(id) }, { $set: data }, { upsert: true })
		} catch (err) {
			console.error(err)
		}
	}

	async delete(collection, id) {
		try {
			const db = await this.connect()
			return await db.collection(collection).deleteOne({ _id: ObjectId(id) })
		} catch (err) {
			console.error(err)
		}
	}
}
