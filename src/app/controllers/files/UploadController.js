import File from '../../models/File'

import Storage from '../../../libs/Storage'

class UploadController {
  async store(request, response) {
    const { domain } = request.params
    const { filename: name, path: filepath, size } = request.file
    const { dir } = request.query

    const { secure_url: url, public_id: path } = await Storage.upload(
      dir ? `${domain}/${dir}` : domain,
      filepath
    )

    const file = await File.create({ name, path, url, size })

    return response.json(file)
  }
}

export default new UploadController()
