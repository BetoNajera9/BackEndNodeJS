import express from 'express'
import morgan from 'morgan'

import config from './config/index'
import moviesApi from './routes/movies'
import userMoviesApi from './routes/userMovies'
import usersApi from './routes/users'
import authApi from './routes/auth'
// import { errorHandler, logErrors } from './utils/middleware/errorHandlers'

const app = express()

//Middlewares
app.use(express.json())
app.use(morgan('dev'))

app.use('/api/movie', moviesApi)
app.use('/api/user', usersApi)
app.use('/api/auth', authApi)
app.use('/api/user-movies', userMoviesApi)

// app.use(errorHandler())
// app.use(logErrors())

app.listen(config.api.port, () => {
	console.log(`Listening http://localhost:${config.api.port}`)
})
