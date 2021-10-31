const { Schema, model } =  require('mongoose')
const bcrypt = require('bcrypt')

const UserSchema = new Schema({
  name: {
    type: String,
    require: true
  },
  email: {
    type: String,
    require: true
  },
  password: {
    type: String,
    require: true
  }
}, { timestamp: true })
// bcrypt || Encryption
UserSchema.methods.encrypPassword = async password => {
  const salt = await bcrypt.genSalt(10)
  return await bcrypt.hash(password, salt)
}
// Validation || Compare
UserSchema.methods.matchPassword = async function(password) {
  return await bcrypt.compare(password, this.password)
} // boolean



module.exports = model('User', UserSchema)
