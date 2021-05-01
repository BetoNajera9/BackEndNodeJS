import joi from 'joi'

export const userIdSchema = joi.string().regex(/^[0-9a-fA-F]{24}$/)

export const createUserSchema = joi.object({
	name: joi
		.string()
		.max(100)
		.required(),
	email: joi
		.string()
		.email()
		.required(),
	password: joi.string().required(),
	isAdmin: joi.boolean(),
})
