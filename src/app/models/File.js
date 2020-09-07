import cloudinary from 'cloudinary'
import fs from 'fs'
import mongoose from 'mongoose'
import { resolve } from 'path'
import { promisify } from 'util'

const FileSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    path: {
      type: String,
      required: true
    },
    url: {
      type: String,
      require: true
    },
    size: {
      type: Number,
      required: true
    }
  },
  {
    timestamps: true
  }
)

FileSchema.pre('save', function () {
  if (process.env.STORAGE_TYPE === 'local') {
    return `${process.env.APP_URL}/file/${this.path}`
  }
})

FileSchema.pre('deleteOne', { document: true }, function () {
  if (process.env.STORAGE_TYPE === 'local') {
    return promisify(fs.unlink)(
      resolve(__dirname, '..', '..', '..', 'tmp', 'uploads', this.path)
    )
  } else {
    const storageCloud = cloudinary.v2

    storageCloud.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET
    })

    return storageCloud.api.delete_resources([this.path])
  }
})

export default mongoose.model('File', FileSchema)
