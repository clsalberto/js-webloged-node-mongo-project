import { Router } from 'express'
import multer from 'multer'

import UploadController from '../app/controllers/files/UploadController'

import multerConfig from '../config/multer'

const routes = Router()
const upload = multer(multerConfig)

/* File Upload Rotes */
routes.get('/files', UploadController.index)
routes.post('/files', upload.single('file'), UploadController.store)

export default routes
