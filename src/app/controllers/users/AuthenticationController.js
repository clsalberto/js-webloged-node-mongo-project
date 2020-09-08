import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

import User from '../../models/User'

import appConfig from '../../../config/app'

class AuthenticationController {
  async store(request, response) {
    const { email, password } = request.body

    const user = await User.findOne({ email }).select('+password')

    if (!user) {
      return response.status(400).json({ error: 'User not found' })
    }

    if (!user.actived) {
      return response.status(400).json({ error: 'User not activated' })
    }

    if (user.configuration.domain === undefined) {
      return response.status(400).json({ error: 'Not configured user' })
    }

    if (!(await bcrypt.compare(password, user.password))) {
      return response.status(400).json({ error: 'Invalid password' })
    }

    user.password = undefined

    const token = jwt.sign({ id: user._id }, appConfig.secret, {
      expiresIn: appConfig.expiresIn
    })

    return response.json({ user, token })
  }
}

export default new AuthenticationController()
