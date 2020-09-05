import 'dotenv/config'
import 'express-async-errors'

import cors from 'cors'
import express from 'express'
import helmet from 'helmet'
import { resolve } from 'path'

import routes from '../routes'

import '../database'

class App {
  constructor() {
    this.server = express()

    this.middlewares()
    this.routes()
    this.exceptionHandler()
  }

  middlewares() {
    this.server.use(
      cors({
        origin: process.env.FRONT_URL
      })
    )

    this.server.use(helmet())
    this.server.use(express.json())

    this.server.use(
      '/files',
      express.static(resolve(__dirname, '..', '..', 'tmp', 'uploads'))
    )
  }

  routes() {
    this.server.use(routes)
  }

  exceptionHandler() {
    this.server.use(async (error, request, response, next) => {
      if (process.env.NODE_ENV === 'development') {
        return response.json(error)
      }

      return response.status(500).json({ error: 'Internal server error' })
    })
  }
}

export default new App().server
