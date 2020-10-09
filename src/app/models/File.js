import cloudinary from 'cloudinary'
import mongoose from 'mongoose'

import Storage from '../../libs/Storage'

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
    timestamps: true,
    toJSON: {
      transform: (doc, ret) => {
        delete ret.__v
      }
    }
  }
)

FileSchema.pre('deleteOne', { document: true }, async function () {
  return await Storage.destroy(this.path)
})

export default mongoose.model('File', FileSchema)
