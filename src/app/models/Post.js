import mongoose from 'mongoose'

const PostSchema = new mongoose.Schema(
  {
    domain: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Domain'
    },
    title: {
      type: String,
      required: true
    },
    subtitle: {
      type: String,
      minlength: 200,
      maxlength: 1000,
      required: true
    },
    image: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'File'
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Category'
    },
    body: {
      type: String,
      minlength: 1000,
      required: true
    },
    counters: {
      views: {
        type: Number,
        required: true,
        default: 0
      },
      likes: {
        type: Number,
        required: true,
        default: 0
      },
      dislikes: {
        type: Number,
        required: true,
        default: 0
      }
    },
    publicationDate: {
      type: Date,
      required: true,
      default: new Date()
    },
    published: {
      type: Boolean,
      required: true,
      default: false
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

export default mongoose.model('Post', PostSchema)
