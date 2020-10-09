import Blog from '../../models/Blog'
import File from '../../models/File'

import Storage from '../../../libs/Storage'

class RegisterCategoryController {
  async delete(request, response) {
    const { domain, id } = request.params

    try {
      const blog = await Blog.findOne({ domain })

      if (!blog) {
        return response.status(400).json({ error: 'Blog not found.' })
      }

      const category = blog.categories.filter(category => category.id === id)[0]

      const file = await File.findById(category.image)

      Storage.destroy(file.path)
      blog.categories.pull(category)

      blog.save()

      return response.json({ message: 'Category successfully deleted.' })
    } catch (error) {
      return response.json({ error })
    }
  }
}

export default new RegisterCategoryController()
