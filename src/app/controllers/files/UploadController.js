import File from '../../models/File'

class UploadController {
  async index(request, response) {
    const files = await File.find()

    return response.json(files)
  }

  async store(request, response) {
    const { originalname: name, filename: path, path: url, size } = request.file

    const file = await File.create({ name, path, url, size })

    return response.json(file)
  }
}

export default new UploadController()
