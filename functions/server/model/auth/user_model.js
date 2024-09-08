const mongoose = require('mongoose')

const user_Schema = mongoose.Schema(
    {
        FirstName:{ type: String, required: true, },
        LastName:{ type: String, required: true, },
        Email: { type: String, required: true, unique: true },
        Password: { type: String, required: true }
    },
    {
      versionKey: false
    }
  );
  
  const userModel = mongoose.model('USER_DETAILS', user_Schema);
  
  module.exports = { userModel };