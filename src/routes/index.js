import { Router } from 'express'

import { description, author, version } from '../../package.json'
import domainRoutes from './domains'
import userRoutes from './users'

const routes = Router()

routes.get('/', (request, response) => {
  const project = { project: 'Webloged Api', description, author, version }
  return response.json(project)
})

routes.use(userRoutes)
routes.use(domainRoutes)

export default routes
