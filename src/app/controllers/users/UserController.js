import User from '../../models/User'

class UserController {
  async index(request, response) {
    const users = await User.find()

    return response.json(users)
  }
}

export default new UserController()
