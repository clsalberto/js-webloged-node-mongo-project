import crypto from 'crypto'

import Token from '../../models/Token'
import User from '../../models/User'

class RegisterUserController {
  async store(request, response) {
    const { name, surname, email, password } = request.body

    try {
      const userExists = await User.findOne({ email })

      if (userExists) {
        return response.status(400).json({ error: 'User already exists.' })
      }

      const user = await User.create({ name, surname, email, password })

      if (user) {
        const hash = crypto.randomBytes(20).toString('hex')
        const expired = new Date()
        expired.setHours(expired.getHours() + 1)

        await Token.create({ email, hash, expired })
      }

      user.password = undefined

      return response.json(user)
    } catch (error) {
      return response.json({ error })
    }
  }
}

export default new RegisterUserController()
