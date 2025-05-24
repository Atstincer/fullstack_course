const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    minLength: 3,
    unique: true
  },
  passwordHash: String,
  name: String,
  blogs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Blog'
    }
  ]
})

userSchema.set('toJSON', {
  transform: (document, objectReturned) => {
    objectReturned.id = objectReturned._id.toString()
    delete objectReturned._id
    delete objectReturned.__v
    delete objectReturned.passwordHash
  }
})

module.exports = mongoose.model('User', userSchema)