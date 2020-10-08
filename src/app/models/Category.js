import mongoose from 'mongoose'

const CategorySchema = new mongoose.Schema(
  {
    domain: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Domain'
    },
    image: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'File'
    },
    name: {
      type: String,
      required: true
    },
    slug: {
      type: String,
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

export default mongoose.model('Category', CategorySchema)
