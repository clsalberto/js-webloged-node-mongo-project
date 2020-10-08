import File from '../../models/File'

import Storage from '../../../libs/Storage'

class UploadController {
  async index(request, response) {
    const files = await File.find()

    return response.json(files)
  }

  async store(request, response) {
    const { domain } = request.params
    const { dir } = request.query
    const { filename: name, path: filepath, size } = request.file

    const {
      secure_url: url,
      public_id: path,
      resource_type: type,
      format
    } = await Storage.upload(dir ? `${domain}/${dir}` : domain, filepath)

    const file = await File.create({ name, type, format, path, url, size })

    return response.json(file)
  }
}

export default new UploadController()
