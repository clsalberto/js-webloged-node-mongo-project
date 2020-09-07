import File from '../../models/File'
import User from '../../models/User'

class AvatarController {
  async update(request, response) {
    const { userId } = request.params
    const { originalname: name, filename: path, path: url, size } = request.file

    const user = await User.findById(userId)

    if (!user) {
      return response.status(400).json({ error: 'User already exists.' })
    }

    const file = await File.create({ name, path, url, size })

    await user.updateOne({
      avatar: file._id
    })

    return response.json(user)
  }
}

export default new AvatarController()
