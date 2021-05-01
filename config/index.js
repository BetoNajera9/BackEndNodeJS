require('dotenv/config')

export default {
	api: {
		env: process.env.NODE_ENV ?? 'dev',
		port: process.env.PORT ?? 3000,
		cors: process.env.CORS,
	},
	mongo: {
		user: process.env.MONGO_USER ?? '',
		password: process.env.MONGO_PASSWORD ?? '',
		host: process.env.MONGO_HOST ?? '',
		name: process.env.MONGO_NAME ?? '',
	},
	user: {
		adminPass: process.env.DEFAULT_ADMIN_PASSWORD ?? '',
		userPass: process.env.DEFAULT_USER_PASSWORD ?? '',
	},
	auth: {
		secret: process.env.AUTH_JWT_SECRET ?? '',
	},
	keys: {
		public: process.env.PUBLIC_API_KEYS_TOKEN ?? '',
		admin: process.env.ADMIN_API_KEY_TOKEN ?? '',
	},
}
