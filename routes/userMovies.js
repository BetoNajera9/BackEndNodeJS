import express from 'express'
import passport from 'passport'

import UserMoviesService from '../services/userMovies'
import validationHandler from '../utils/middleware/validationHandler'
import scopesValidationHandler from '../utils/middleware/scopesValidationHandler'
import { movieIdSchema } from '../utils/schemas/movies'
import { createUserMovieSchema } from '../utils/schemas/userMovies'

//JWT Estrategies
require('../utils/auth/strategies/jwt')

const router = express.Router()

const userMoviesService = new UserMoviesService()

router.get(
	'/',
	passport.authenticate('jwt', { session: false }),
	scopesValidationHandler(['read:user-movies']),
	async (req, res, next) => {
		const { tags } = req.query
		try {
			const userMovies = await userMoviesService.getUsersMovies({ tags })

			res.status(200).json({
				message: 'users movies listed',
				data: userMovies,
			})
		} catch (err) {
			next(err)
		}
	}
)

router.get(
	'/:id',
	passport.authenticate('jwt', { session: false }),
	scopesValidationHandler(['read:ser-movies']),
	async (req, res, next) => {
		try {
			const userMovies = await userMoviesService.getUserMovies(req.params.id)

			res.status(200).json({
				message: 'user movies listed',
				data: userMovies,
			})
		} catch (err) {
			next(err)
			console.error(err)
		}
	}
)

router.post(
	'/',
	passport.authenticate('jwt', { session: false }),
	scopesValidationHandler(['create:user-movies']),
	validationHandler(createUserMovieSchema),
	async (req, res, next) => {
		const { body: userMovie } = req

		try {
			const createdUserMovieId = await userMoviesService.createUserMovies({
				userMovie,
			})

			res.status(201).json({
				message: 'user movie created',
				data: createdUserMovieId,
			})
		} catch (err) {
			next(err)
		}
	}
)

router.delete(
	'/:userMovieId',
	passport.authenticate('jwt', { session: false }),
	scopesValidationHandler(['delete:user-movies']),
	validationHandler(movieIdSchema, 'params'),
	async (req, res, next) => {
		const { userMovieId } = req.params

		try {
			const deletedUserMovieId = await userMoviesService.deleteUserMovie({
				userMovieId,
			})

			res.status(200).json({
				message: 'user movie deleted',
				data: deletedUserMovieId,
			})
		} catch (error) {
			next(error)
		}
	}
)

export default router
