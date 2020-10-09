import { Router } from 'express'

import BlogController from '../app/controllers/blogs/BlogController'
import RegisterBlogController from '../app/controllers/blogs/RegisterBlogController'

const routes = Router()

/* Blog Rotes */
routes.get('/:domain', BlogController.index)
routes.post('/blogs/:hash', RegisterBlogController.store)
routes.post('/blogs/:userId', BlogController.store)

export default routes
