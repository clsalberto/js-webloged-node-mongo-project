import crypto from 'crypto'
import multer from 'multer'
import { extname, resolve } from 'path'

export default {
  storage: multer.diskStorage({
    destination: resolve(__dirname, '..', '..', 'tmp', 'uploads'),
    filename: (_, file, cb) => {
      crypto.randomBytes(16, (error, response) => {
        if (error) return cb(error)

        return cb(null, response.toString('hex') + extname(file.originalname))
      })
    },
    limits: {
      fileSize: 5 * 1024 + 1024
    },
    fileFilter: (_, file, cb) => {
      const allowedMimes = [
        'image/jpeg',
        'image/pjpeg',
        'image/png',
        'image/gif'
      ]

      if (allowedMimes.includes(file.mimetype)) {
        cb(null, true)
      } else {
        cb(new Error('Invalid file type.'))
      }
    }
  })
}
