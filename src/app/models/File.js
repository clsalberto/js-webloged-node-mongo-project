import mongoose from 'mongoose'

import { url } from '../../config/app'

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
    size: {
      type: Number,
      required: true
    }
  },
  {
    timestamps: true
  }
)

FileSchema.method.getUrl(function () {
  return `${url}/files/${this.path}`
})

export default mongoose.model('File', FileSchema)
