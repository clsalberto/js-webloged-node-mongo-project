import Blog from '../../models/Blog'
import File from '../../models/File'

import Storage from '../../../libs/Storage'

class RegisterCategoryController {
  async store(request, response) {
    const { domain } = request.params
    const { name, slug } = request.body

    try {
      const blog = await Blog.findOne({ domain })

      if (!blog) {
        return response.status(400).json({ error: 'Blog not found.' })
      }

      const category = { name, slug }

      if (request.file) {
        const { filename, path, size } = request.file

        const dir = `${domain}/categories`

        const { secure_url, public_id } = await Storage.upload(dir, path)

        await blog.files.push({
          name: filename,
          path: public_id,
          url: secure_url,
          size
        })

        await blog.save()

        const file = await blog.files.filter(file => file.name === filename)[0]

        category.image = file._id
      }

      await blog.categories.push(category)

      await blog.save()

      return response.json({ message: 'Category created successfully.' })
    } catch (error) {
      return response.json({ error })
    }
  }
}

export default new RegisterCategoryController()
