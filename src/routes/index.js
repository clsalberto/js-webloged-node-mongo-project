import { Router } from 'express'

import { description, author, version } from '../../package.json'
import blogRoutes from './blogs'
import categoryRoutes from './categories'
import fileRoutes from './files'
import userRoutes from './users'

const routes = Router()

routes.get('/', (request, response) => {
  const project = { project: 'Webloged Api', description, author, version }
  return response.json(project)
})

routes.use(fileRoutes)
routes.use(userRoutes)
routes.use(blogRoutes)
routes.use(categoryRoutes)

export default routes
