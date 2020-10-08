import Blog from '../../models/Blog'
import Token from '../../models/Token'
import User from '../../models/User'

class RegisterBlogController {
  async store(request, response) {
    const { hash } = request.params

    const { name, domain } = request.body

    try {
      const token = await Token.findOne({ hash })

      if (!token) {
        return response.status(400).json({ error: 'Token does not exist.' })
      }

      if (token.status === 'USED') {
        return response.status(400).json({ error: 'Token already used.' })
      }

      if (token.expired < new Date()) {
        if (token.status !== 'EXPIRED') {
          await token.updateOne({
            status: 'EXPIRED'
          })
        }
        return response.status(400).json({ error: 'Expired token.' })
      }

      const user = await User.findOne({
        email: token.email
      })

      if (!user) {
        return response.status(400).json({ error: 'User does not exist.' })
      }

      const blog = await Blog.create({
        owner: user._id,
        name,
        domain
      })

      await token.updateOne({
        status: 'USED'
      })

      await user.updateOne({
        blogs: [blog._id],
        active: true
      })

      return response.json(blog)
    } catch (error) {
      return response.json({ error })
    }
  }
}

export default new RegisterBlogController()
