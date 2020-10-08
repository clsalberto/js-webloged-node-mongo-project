import { Router } from 'express'
import multer from 'multer'

import CategoriesController from '../app/controllers/categories/CategoriesController'
import RegisterCategoryController from '../app/controllers/categories/RegisterCategoryController'

import multerConfig from '../config/multer'

const routes = Router()
const upload = multer(multerConfig)

/* Category Rotes */
routes.get('/:domain/categories', CategoriesController.index)
routes.post(
  '/:domain/categories',
  upload.single('image'),
  RegisterCategoryController.store
)

export default routes
