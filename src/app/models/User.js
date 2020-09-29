import bcrypt from 'bcryptjs'
import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema(
  {
    avatar: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'File'
    },
    name: {
      type: String,
      required: true
    },
    surname: {
      type: String,
      required: true
    },
    email: {
      type: String,
      unique: true,
      lowercase: true,
      required: true
    },
    password: {
      type: String,
      required: true,
      select: false
    },
    profile: {
      gender: String,
      birthDate: String,
      aboutMe: String
    },
    domains: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Domain'
      }
    ],
    active: {
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

UserSchema.pre('save', async function () {
  if (this.password) {
    this.password = await bcrypt.hash(this.password, 8)
  }
})

export default mongoose.model('User', UserSchema)
