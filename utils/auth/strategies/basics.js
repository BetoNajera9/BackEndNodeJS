import passport from 'passport'
import { BasicStrategy } from 'passport-http'
import boom from '@hapi/boom'
import bcrypt from 'bcrypt'

import UserService from '../../../services/users'

passport.use(
	new BasicStrategy(async (email, password, cb) => {
		const userService = new UserService()
		try {
			const user = await userService.getUsers({ email })

			if (!user) return cb(boom.unauthorized(), false)

			if (!(await bcrypt.compare(password, user[0].password)))
				return cb(boom.unauthorized(), false)

			delete user[0].password

			return cb(null, user[0])
		} catch (err) {
			return cb(err)
		}
	})
)
