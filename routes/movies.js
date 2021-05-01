import express from 'express'
import passport from 'passport'

import MoviesService from '../services/movies'
import validationHandler from '../utils/middleware/validationHandler'
import scopesValidationHandler from '../utils/middleware/scopesValidationHandler'
import {
	movieIdSchema,
	createMovieSchema,
	updateMovieSchema,
} from '../utils/schemas/movies'

//JWT Estrategies
require('../utils/auth/strategies/jwt')

const router = express.Router()
const moviesService = new MoviesService()

router.get(
	'/',
	passport.authenticate('jwt', { session: false }),
	scopesValidationHandler(['read:movies']),
	async (req, res, next) => {
		const { tags } = req.query
		try {
			const movies = await moviesService.getMovies({ tags })

			res.status(200).json({
				data: movies,
				message: 'movies listed',
			})
		} catch (err) {
			console.error(err)
			next(err)
		}
	}
)

router.get(
	'/:movieId',
	passport.authenticate('jwt', { session: false }),
	scopesValidationHandler(['read:movies']),
	async (req, res, next) => {
		const { movieId } = req.params

		try {
			const movies = await moviesService.getMovie({ movieId })

			res.status(200).json({
				data: movies,
				message: 'movie retrieved',
			})
		} catch (err) {
			console.error(err)
			next(err)
		}
	}
)

router.post(
	'/',
	passport.authenticate('jwt', { session: false }),
	scopesValidationHandler(['create:movies']),
	validationHandler(createMovieSchema),
	async (req, res, next) => {
		const { body: movie } = req
		try {
			const createdMovieId = await moviesService.createMovie({ movie })

			res.status(201).json({
				data: createdMovieId,
				message: 'movie created',
			})
		} catch (err) {
			next(err)
		}
	}
)

router.put(
	'/:movieId',
	passport.authenticate('jwt', { session: false }),
	scopesValidationHandler(['update:movies']),
	validationHandler(movieIdSchema, 'params'),
	validationHandler(updateMovieSchema),
	async (req, res, next) => {
		const { movieId } = req.params
		const { body: movie } = req

		try {
			const updatedMovieId = await moviesService.updateMovie({
				movieId,
				movie,
			})

			res.status(200).json({
				data: updatedMovieId,
				message: 'movie updated',
			})
		} catch (err) {
			next(err)
		}
	}
)

router.delete(
	'/:movieId',
	passport.authenticate('jwt', { session: false }),
	scopesValidationHandler(['read:movies']),
	validationHandler(movieIdSchema, 'params'),
	async (req, res, next) => {
		const { movieId } = req.params

		try {
			const deletedMovieId = await moviesService.deleteMovie({ movieId })

			res.status(200).json({
				data: deletedMovieId,
				message: 'movie deleted',
			})
		} catch (err) {
			next(err)
		}
	}
)

export default router
