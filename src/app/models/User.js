import bcrypt from 'bcryptjs'
import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema(
  {
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
    avatar: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'File'
    },
    profile: {
      gender: String,
      birthDate: String,
      aboutMe: String
    },
    configuration: {
      blogName: String,
      primaryColor: String,
      secundaryColor: String,
      theme: String
    },
    actived: {
      type: Boolean,
      required: true,
      default: false
    }
  },
  {
    timestamps: true
  }
)

UserSchema.pre('save', async function () {
  if (this.password) {
    this.password = await bcrypt.hash(this.password, 8)
  }
})

export default mongoose.model('User', UserSchema)
