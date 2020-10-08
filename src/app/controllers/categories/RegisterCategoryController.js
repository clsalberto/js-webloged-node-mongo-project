import Blog from '../../models/Blog'
import Category from '../../models/Category'
import File from '../../models/File'

class RegisterCategoryController {
  async store(request, response) {
    const { domain } = request.params
    const { name, slug } = request.body

    try {
      const blog = await Blog.findOne({ domain })

      if (!blog) {
        return response.status(400).json({ error: 'Blog not exists.' })
      }

      const category = await Category.create({
        blog: blog._id,
        name,
        slug
      })

      if (request.file) {
        const {
          originalname: filename,
          filename: path,
          path: url,
          size
        } = request.file
        const file = await File.create({ name: filename, path, url, size })
        await category.updateOne({ image: file._id })
      }

      return response.json(category)
    } catch (error) {
      return response.json(error)
    }
  }
}

export default new RegisterCategoryController()
