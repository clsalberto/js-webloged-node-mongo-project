import File from '../../models/File'

class UploadController {
  async index(request, response) {
    const files = await File.find()

    return response.json(files)
  }

  async store(request, response) {
    const { originalname: name, filename: path, size } = request.file

    const file = await File.create({ name, path, size })

    return response.json({ file, url: file.url })
  }
}

export default new UploadController()
