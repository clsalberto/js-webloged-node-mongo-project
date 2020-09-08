import jwt from 'jsonwebtoken'

import appConfig from '../../config/app'

export default (request, response, next) => {
  const authHeader = request.headers.authorization

  if (!authHeader) {
    return response.status(401).json({ error: 'No token provided' })
  }

  const parts = authHeader.split(' ')

  if (!parts.length === 2) {
    return response.status(401).json({ error: 'Token error' })
  }

  const [scheme, token] = parts

  if (!/^Bearer$/i.test(scheme)) {
    return response.status(401).json({ error: 'Token malformatted' })
  }

  jwt.verify(token, appConfig.secret, (err, decoded) => {
    if (err) return response.status(401).json({ error: 'Token invalid' })

    request.userId = decoded.id
    return next()
  })
}
