import User from '../../models/User'

class ProfileController {
  async update(request, response) {
    const { userId } = request.params
    const { gender, birthDate, aboutMe } = request.body

    const user = await User.findById(userId)

    if (!user) {
      return response.status(400).json({ error: 'User already exists.' })
    }

    await user.updateOne({
      profile: { gender, birthDate, aboutMe }
    })

    return response.json(user)
  }
}

export default new ProfileController()
