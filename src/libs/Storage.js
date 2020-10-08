import cloudinary from 'cloudinary'
import fs from 'fs'
import { promisify } from 'util'

import cloudinaryConfig from '../config/cloudinary'

class Storage {
  constructor() {
    this.init()
  }

  init() {
    this.storage = cloudinary.v2
    this.storage.config(cloudinaryConfig)
  }

  async upload(dir, file) {
    try {
      return await this.storage.uploader.upload(
        file,
        { folder: dir },
        (error, result) => {
          if (error) return error
          return result
        }
      )
    } finally {
      if (process.env.STORAGE_TYPE === 'cloudinary') {
        promisify(fs.unlink)(file)
      }
    }
  }

  async destroy(fid) {
    return await this.storage.uploader.destroy(fid, (error, result) => {
      if (error) return error
      return result
    })
  }

  async image(fid, options = {}) {
    return this.storage.image(fid, options)
  }
}

export default new Storage()
