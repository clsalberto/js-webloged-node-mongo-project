import { Router } from 'express'
import multer from 'multer'

import CategoryController from '../app/controllers/categories/CategoryController'
import RegisterCategoryController from '../app/controllers/categories/RegisterCategoryController'

import multerConfig from '../config/multer'

const routes = Router()
const upload = multer(multerConfig)

/* Category Rotes */
routes.post(
  '/:domain/categories',
  upload.single('image'),
  RegisterCategoryController.store
)
routes.delete('/:domain/categories/:id', CategoryController.delete)

export default routes
