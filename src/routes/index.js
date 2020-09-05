import { Router } from 'express'

import RegisterController from '../app/controllers/users/RegisterController'

const routes = Router()

routes.get('/', (request, response) =>
  response.json({ message: 'Welcome to Project' })
)

routes.post('/auth/register', RegisterController.store)

export default routes
