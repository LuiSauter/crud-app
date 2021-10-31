const mongoose = require('mongoose')

const { MONGO_DB_URI, MONGO_DB_URI_TEST, NODE_ENV } = process.env

const connectionString = NODE_ENV === 'test'
  ? MONGO_DB_URI_TEST
  :MONGO_DB_URI

mongoose.connect(connectionString, {
  useNewUrlParser: true, useUnifiedTopology: true
})
  .then(() => console.log('Database is connected mongodb'))
  .catch(err => console.log(err))

process.on('uncaughtException', (err) => {
  console.log(err)
  mongoose.disconnect()
})