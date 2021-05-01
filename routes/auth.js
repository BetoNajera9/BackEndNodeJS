import express from 'express'
import passport from 'passport'
import boom from '@hapi/boom'
import jwt from 'jsonwebtoken'

import ApiKeysService from '../services/apiKeys'
import config from '../config'
import UsersService from '../services/users'
import validationHandler from '../utils/middleware/validationHandler'
import { createUserSchema } from '../utils/schemas/users'

//Basic Estrategies
require('../utils/auth/strategies/basics')

const router = express.Router()
const apiKeysService = new ApiKeysService()
const usersService = new UsersService()

router.post('/sign-in', async (req, res, next) => {
	const { apiKeyToken } = req.body

	if (!apiKeyToken) next(boom.unauthorized('apiKeyToken is required'))

	passport.authenticate('basic', async (err, user) => {
		try {
			if (err) next(boom.unauthorized())

			req.login(user, { session: false }, async (err) => {
				if (err) next(err)

				const apiKey = await apiKeysService.getApiKey({ token: apiKeyToken })

				if (!apiKey) next(boom.unauthorized())

				const { _id: id, name, email } = user
				const payload = {
					sub: id,
					name,
					email,
					scopes: apiKey.scopes,
				}

				const token = jwt.sign(payload, config.auth.secret, {
					expiresIn: '15m',
				})

				return res.status(200).json({ token, user: { id, name, email } })
			})
		} catch (err) {
			console.error(err)
		}
	})(req, res, next)
})

router.post(
	'/sign-up',
	validationHandler(createUserSchema),
	async (req, res, next) => {
		const { body: user } = req

		try {
			const createUserId = await usersService.createUser(user)
			res.status(201).json({
				message: 'User created',
				data: createUserId,
			})
		} catch (err) {
			next(err)
			console.error(err)
		}
	}
)

export default router
