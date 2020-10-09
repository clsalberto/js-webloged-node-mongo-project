import Blog from '../../models/Blog'
import User from '../../models/User'

class BlogController {
  async index(request, response) {
    const { domain } = request.params

    try {
      const blog = await Blog.findOne({ domain })
        .populate('owner', ['name', 'surname', 'email'])
        .populate('files', ['name', 'url'])

      if (!blog) {
        return response.status(400).json({ error: 'Blog not found.' })
      }

      return response.json(blog)
    } catch (error) {
      return response.json({ error })
    }
  }

  async store(request, response) {
    const { userId } = request.params
    const { name, domain } = request.body

    try {
      const user = await User.findById(userId)

      if (!user) {
        return response.status(400).json({ error: 'User not found.' })
      }

      const blog = await Blog.create({
        owner: user._id,
        name,
        domain
      })

      user.blogs.push(blog._id)
      user.save()

      return response.json({ message: 'Blog successfully created.' })
    } catch (error) {
      return response.status(400).json(error)
    }
  }
}

export default new BlogController()
