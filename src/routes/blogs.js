import { Router } from 'express'

import BlogController from '../app/controllers/blogs/BlogController'
import RegisterBlogController from '../app/controllers/blogs/RegisterBlogController'

const routes = Router()

/* Blog Rotes */
routes.get('/:domain', BlogController.index)
routes.post('/domain/:hash', RegisterBlogController.store)

export default routes
