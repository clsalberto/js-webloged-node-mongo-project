import User from '../../models/User'

class ConfigurationController {
  async update(request, response) {
    const { userId } = request.params
    const { blogName, primaryColor, secundaryColor, theme } = request.body

    const user = await User.findById(userId)

    if (!user) {
      return response.status(400).json({ error: 'User already exists.' })
    }

    await user.updateOne({
      configuration: { blogName, primaryColor, secundaryColor, theme }
    })

    return response.json(user)
  }
}

export default new ConfigurationController()
