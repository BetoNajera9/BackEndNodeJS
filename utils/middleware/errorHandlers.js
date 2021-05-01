import boom from '@hapi/boom'
import config from '../../config'

const withErrorStack = (error, stack) => {
	if (config.api.env === 'dev') {
		return { ...error, stack }
	}

	return error
}

const logErrors = (err, req, res, next) => {
	console.error(err)
	next(err)
}

const wrapErrors = (err, req, res, next) => {
	if (!err.isBoom) {
		next(boom.badImplementation(err))
	}

	next(err)
}

const errorHandler = (err, req, res) => {
	// eslint-disable-line
	const {
		output: { statusCode, payload },
	} = err
	res.status(statusCode)
	res.json(withErrorStack(payload, err.stack))
}

export { logErrors, wrapErrors, errorHandler }
