import crypto from 'crypto'
import multer from 'multer'
import { extname, resolve } from 'path'

const storage = multer.diskStorage({
  destination: (request, file, cb) => {
    cb(null, resolve(__dirname, '..', '..', 'tmp', 'uploads'))
  },
  filename: (request, file, cb) => {
    crypto.randomBytes(16, (error, hash) => {
      if (error) cb(error)
      cb(null, hash.toString('hex') + extname(file.originalname))
    })
  }
})

export default {
  storage,
  limits: {
    fileSize: 20 * 1024 * 1024
  },
  fileFilter: (request, file, cb) => {
    const allowedMimes = [
      'image/jpeg',
      'image/jpg',
      'image/png',
      'image/gif',
      'application/pdf',
      'text/plain'
    ]

    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true)
    } else {
      cb(new Error('Invalid file type.'))
    }
  }
}
