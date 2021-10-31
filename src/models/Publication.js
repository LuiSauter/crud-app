const { Schema, model } = require('mongoose')

const PublicationSchema = new Schema({
  image: {
    type: String,
    required: true
  },
  comment: {
    type: String
  }
}, { timestamp: true })

module.exports = model('Publication', PublicationSchema)