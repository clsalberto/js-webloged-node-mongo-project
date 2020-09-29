import mongoose from 'mongoose'

const DomainSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    logo: {
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
    },
    theme: {
      primaryColor: {
        type: String,
        required: true
      },
      secondaryColor: {
        type: String,
        required: true
      },
      themeType: {
        type: String,
        required: true,
        default: 'light'
      }
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
export default mongoose.model('Domain', DomainSchema)
