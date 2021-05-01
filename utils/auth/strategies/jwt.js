import passport from 'passport'
import { Strategy, ExtractJwt } from 'passport-jwt'
import boom from '@hapi/boom'

import UsersService from '../../../services/users'
import config from '../../../config'

passport.use(
	new Strategy(
		{
			secretOrKey: config.auth.secret,
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
		},
		async (tokenPayload, cb) => {
			const userServise = new UsersService()

			try {
				const user = await userServise.getUsers({ email: tokenPayload.email })

				if (!user) {
					return cb(boom.unauthorized(), false)
				}

				delete user.password

				cb(null, { ...user, scopes: tokenPayload.scopes })
			} catch (err) {
				console.error(err)
			}
		}
	)
)
