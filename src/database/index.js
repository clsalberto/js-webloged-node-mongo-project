import mongoose from 'mongoose'

class Database {
  constructor() {
    this.init()
  }

  init() {
    this.mongoConnection = mongoose.connect(process.env.MONGO_URL, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
  }
}

export default new Database()
