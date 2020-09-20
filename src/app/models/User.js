import bcrypt from 'bcryptjs'
import crypto from 'crypto'
import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    surname: { type: String, required: true },
    email: { type: String, unique: true, lowercase: true, required: true },
    password: { type: String, required: true, select: false },
    profile: {
      gender: String,
      birthDate: String,
      aboutMe: String
    },
    avatar: { type: mongoose.Schema.Types.ObjectId, ref: 'File' },
    validation: [
      {
        token: { type: String, unique: true, required: true },
        expired: { type: Date, required: true },
        status: { type: String, required: true, default: 'PENDING' }
      }
    ],
    active: { type: Boolean, required: true, default: false }
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
  if (this.email) {
    const token = crypto.randomBytes(20).toString('hex')
    const expired = new Date()
    expired.setHours(expired.getHours() + 1)

    this.validation.push({ token, expired })
  }
  if (this.password) {
    this.password = await bcrypt.hash(this.password, 8)
  }
})

export default mongoose.model('User', UserSchema)
