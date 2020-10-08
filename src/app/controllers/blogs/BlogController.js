import Blog from '../../models/Blog'

class BlogController {
  async index(request, response) {
    const { slug } = request.params

    try {
      const blog = await Blog.findOne({ slug }).populate('owner', [
        'name',
        'surname',
        'email'
      ])

      if (!blog) {
        return response.status(400).json({ error: 'Blog not exists.' })
      }

      return response.json(blog)
    } catch (error) {
      return response.json({ error })
    }
  }
}

export default new BlogController()
