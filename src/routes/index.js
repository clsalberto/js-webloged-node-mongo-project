import { Router } from 'express'

import { description, author, version } from '../../package.json'
import userRoutes from './users'

const routes = Router()

routes.get('/', (request, response) => {
  const project = { project: 'Webloged Api', description, author, version }
  return response.json(project)
})

routes.use(userRoutes)

export default routes
