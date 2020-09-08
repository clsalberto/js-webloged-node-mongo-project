import File from '../../models/File'
import User from '../../models/User'

class UserController {
  async index(request, response) {
    const users = await User.find().populate('avatar')

    return response.json(users)
  }

  async delete(request, response) {
    const { userId } = request.params

    const user = await User.findById(userId)
    const file = await File.findById(user.avatar._id)
    if (file) {
      await file.deleteOne()
    }
    await user.deleteOne()

    return response.json({ message: 'User deleted' })
  }
}

export default new UserController()
