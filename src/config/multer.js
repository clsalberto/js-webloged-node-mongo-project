import cloudinary from 'cloudinary'
import crypto from 'crypto'
import multer from 'multer'
import { CloudinaryStorage } from 'multer-storage-cloudinary'
import { extname, resolve } from 'path'

const storageCloud = cloudinary.v2

storageCloud.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})

const storageLocal = multer.diskStorage({
  destination: resolve(__dirname, '..', '..', 'tmp', 'uploads'),
  filename: (_request, file, cb) => {
    crypto.randomBytes(16, (error, response) => {
      if (error) return cb(error)
      return cb(null, response.toString('hex') + extname(file.originalname))
    })
  }
})

const storageCloudinary = new CloudinaryStorage({
  cloudinary: storageCloud,
  params: {
    // eslint-disable-next-line no-unused-vars
    folder: (request, file) => {
      const { dir } = request.query
      return !dir ? 'webloged' : `webloged/${dir}`
    }
  }
})

export default {
  storage:
    process.env.STORAGE_TYPE === 'local' ? storageLocal : storageCloudinary,
  limits: {
    fileSize: 5 * 1024 * 1024
  },
  fileFilter: (_request, file, cb) => {
    const allowedMimes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif']

    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true)
    } else {
      cb(new Error('Invalid file type.'))
    }
  }
}
