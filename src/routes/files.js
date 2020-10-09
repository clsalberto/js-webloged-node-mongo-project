import { Router } from 'express'
import multer from 'multer'

import UploadController from '../app/controllers/files/UploadController'

import multerConfig from '../config/multer'

const routes = Router()
const upload = multer(multerConfig)

/* File Upload Rotes */
routes.post('/:domain/files', upload.single('file'), UploadController.store)

export default routes
