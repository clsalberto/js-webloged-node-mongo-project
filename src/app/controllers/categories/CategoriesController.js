import Blog from '../../models/Blog'
import Category from '../../models/Category'

class CategoriesController {
  async index(request, response) {
    const { domain } = request.params

    try {
      const blog = await Blog.findOne({ domain })

      if (!blog) {
        return response.status(400).json({ error: 'Blog not exists.' })
      }

      const categories = await Category.find({
        blog: blog._id
      })
        .populate('blog', ['name', 'domain'])
        .populate('image', ['url'])

      return response.json(categories)
    } catch (error) {
      return response.json({ error })
    }
  }
}

export default new CategoriesController()
