import User from '../../models/User'

import Queue from '../../../libs/Queue'

class RegisterController {
  async store(request, response) {
    const { name, surname, email, password } = request.body

    const userExists = await User.findOne({
      where: { email }
    })

    if (userExists) {
      return response.status(400).json({ error: 'User already exists.' })
    }

    const user = await User.create({ name, surname, email, password })

    user.password = undefined

    await Queue.add('RegistrationMail', { user })

    return response.json(user)
  }
}

export default new RegisterController()
