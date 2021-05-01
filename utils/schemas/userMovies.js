import joi from 'joi'

import { movieIdSchema } from './movies'
import { userIdSchema } from './users'

export const userMovieIdSchema = joi.string().regex(/^[0-9a-fA-F]{24}$/)

export const createUserMovieSchema = joi.object({
	userId: userIdSchema,
	movieId: movieIdSchema,
})
