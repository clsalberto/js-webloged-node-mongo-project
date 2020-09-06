import mongoose from 'mongoose'

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

FileSchema.virtual('url').get(function () {
  return `${process.env.APP_URL}/file/${this.path}`
})

export default mongoose.model('File', FileSchema)
