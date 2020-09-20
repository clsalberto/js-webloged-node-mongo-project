import { Router } from 'express'

import RegisterController from '../app/controllers/users/RegisterController'

const routes = Router()

/* Users Rotes */
routes.post('/users', RegisterController.store)

export default routes
