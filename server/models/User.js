import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const objectId = mongoose.Schema.Types.ObjectId

const userSchema = new mongoose.Schema(
  {
    _id: {
      type: objectId,
      auto: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    versionKey: false,
  }
)

userSchema.methods.matchPassword = async function (enterPassword) {
  return await bcrypt.compare(enterPassword, this.password)
}

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next()
  }

  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})

const User = mongoose.model('Users', userSchema)
export default User
