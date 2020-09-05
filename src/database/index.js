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

    const db = mongoose.connection
    db.once('open', function () {
      console.log('Database is running...')
    })
  }
}

export default new Database()
