import User from '../../models/User'

class UserController {
  async index(request, response) {
    try {
      const users = await User.find().populate('blogs', ['name', 'domain'])

      return response.json(users)
    } catch (error) {
      return response.json(error)
    }
  }

  async show(request, response) {
    const { id } = request.params

    try {
      const user = await User.findOne({ _id: id }).populate('blogs', [
        'name',
        'domain'
      ])

      if (!user) {
        response.status(400).json({ error: 'User not found.' })
      }

      return response.json(user)
    } catch (error) {
      return response.json(error)
    }
  }
}

export default new UserController()
