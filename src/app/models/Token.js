import crypto from 'crypto'
import mongoose from 'mongoose'

const TokenSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      lowercase: true,
      required: true
    },
    hash: {
      type: String,
      required: true
    },
    expired: {
      type: Date,
      require: true
    },
    status: {
      type: String,
      required: true,
      default: 'PENDING'
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

export default mongoose.model('Token', TokenSchema)
