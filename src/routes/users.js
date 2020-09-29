import { Router } from 'express'

import RegisterUserController from '../app/controllers/users/RegisterUserController'
import UsersController from '../app/controllers/users/UsersController'

const routes = Router()

/* Users Rotes */
routes.get('/users', UsersController.index)
routes.post('/users', RegisterUserController.store)

export default routes
