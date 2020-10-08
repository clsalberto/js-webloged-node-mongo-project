import User from '../../models/User'

class UsersController {
  async index(request, response) {
    try {
      const users = await User.find().populate('blogs', ['name', 'domain'])

      return response.json(users)
    } catch (error) {
      return response.json({ error })
    }
  }
}

export default new UsersController()
