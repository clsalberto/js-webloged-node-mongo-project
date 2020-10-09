import { Router } from 'express'

import RegisterUserController from '../app/controllers/users/RegisterUserController'
import UserController from '../app/controllers/users/UserController'

const routes = Router()

/* Users Rotes */
routes.get('/users', UserController.index)
routes.get('/users/:id', UserController.show)
routes.post('/users', RegisterUserController.store)

export default routes
