import jwt from 'jsonwebtoken'

import Domain from '../models/Domain'

import authConfig from '../../config/auth'

export default async (request, response, next) => {
  const { authorization } = request.headers
  const { domain } = request.params

  if (!domain) {
    return response.status(401).json({ error: 'No domain provided.' })
  }

  const domainExist = await Domain.findOne({
    slug: domain
  })

  if (!domainExist) {
    return response.status(401).json({ error: 'Domain does not exist.' })
  }

  if (!authorization) {
    return response.status(401).json({ error: 'No token provided.' })
  }

  const parts = authorization.split(' ')

  if (!parts.length === 2) {
    return response.status(401).json({ error: 'Token error.' })
  }

  const [scheme, token] = parts

  if (!/^Bearer$/i.test(scheme)) {
    return response.status(401).json({ error: 'Token malformatted.' })
  }

  jwt.verify(token, authConfig.secret, (error, decoded) => {
    if (error) return response.status(401).json({ error: 'Token invalid.' })

    request.domainId = domainExist._id
    request.userId = decoded.id
    return next()
  })
}
