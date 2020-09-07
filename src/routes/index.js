import { Router } from 'express'
import multer from 'multer'

import UploadController from '../app/controllers/files/UploadController'
import AvatarController from '../app/controllers/users/AvatarController'
import ConfigurationController from '../app/controllers/users/ConfigurationController'
import ProfileController from '../app/controllers/users/ProfileController'
import RegisterController from '../app/controllers/users/RegisterController'
import UserController from '../app/controllers/users/UserController'

import multerConfig from '../config/multer'

const routes = Router()
const upload = multer(multerConfig)

routes.get('/', (request, response) =>
  response.json({ message: 'Welcome to Project' })
)

routes.get('/files', UploadController.index)
routes.post('/files', upload.single('file'), UploadController.store)

/* Users Rotes */
routes.get('/users', UserController.index)
routes.post('/users', RegisterController.store)
routes.delete('/users/:userId', UserController.delete)
routes.put(
  '/users/:userId/avatar',
  upload.single('avatar'),
  AvatarController.update
)
routes.put('/users/:userId/profile', ProfileController.update)
routes.put('/users/:userId/configuration', ConfigurationController.update)

export default routes
