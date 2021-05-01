import express from 'express'

import UsersService from '../services/users'
import validation from '../utils/middleware/validationHandler'
import { createUserSchema } from '../utils/schemas/users'

const router = express.Router()
const usersService = new UsersService()

router.get('/', async (req, res, next) => {
	const { tags } = req.query
	try {
		const user = await usersService.getUsers({ tags })

		res.status(200).json({
			message: 'users listed',
			data: user,
		})
	} catch (err) {
		next(err)
	}
})

router.get('/:id', async (req, res, next) => {
	try {
		const user = await usersService.getUser(req.params.id)
		res.status(200).json({
			message: 'user listed',
			data: user,
		})
	} catch (err) {
		next(err)
		console.error(err)
	}
})

router.post('/', validation(createUserSchema), async (req, res, next) => {
	try {
		const user = await usersService.createUser(req.body)
		res.status(200).json({
			message: 'user created',
			data: user,
		})
	} catch (err) {
		next(err)
		console.error(err)
	}
})

export default router
