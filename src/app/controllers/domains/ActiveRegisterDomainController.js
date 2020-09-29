import Domain from '../../models/Domain'
import Token from '../../models/Token'
import User from '../../models/User'

class ActiveRegisterDomainController {
  async store(request, response) {
    const { token } = request.params

    const {
      logo,
      name,
      slug,
      theme: { primaryColor, secondaryColor, themeType }
    } = request.body

    try {
      const validateHash = await Token.findOne({
        hash: token
      })

      if (!validateHash) {
        return response.status(400).json({ error: 'Token does not exist.' })
      }

      if (validateHash.status === 'USED') {
        return response.status(400).json({ error: 'Token already used.' })
      }

      if (validateHash.expired < new Date()) {
        if (validateHash.status !== 'EXPIRED') {
          await validateHash.updateOne({
            status: 'EXPIRED'
          })
        }
        return response.status(400).json({ error: 'Expired token.' })
      }

      const user = await User.findOne({
        email: validateHash.email
      })

      if (!user) {
        return response.status(400).json({ error: 'User does not exist.' })
      }

      const domain = await Domain.create({
        owner: user._id,
        logo,
        name,
        slug,
        theme: { primaryColor, secondaryColor, themeType }
      })

      await validateHash.updateOne({
        status: 'USED'
      })

      await user.updateOne({
        domains: [domain._id],
        active: true
      })

      return response.json(domain)
    } catch (error) {
      return response.json({ error })
    }
  }
}

export default new ActiveRegisterDomainController()
