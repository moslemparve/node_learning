import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required:  'Name is required !',
    minlength: [3, 'Name must be at least 3 characters long'],
    maxlength: [50, 'Name must be less than 50 characters long'],
    validate: {
      validator: async function(value) {
        const user = await mongoose.models.User.findOne({ name: value });
        return !user || user._id.equals(this._id);
      },
      message: 'The user already exists, please try another name'
    }
  },
  age: {
    type: Number,
    required: 'Age is required !',
    min: [1, 'Age must be a positive integer'],
    max: [120, 'Age must be less than 120']
  },
  file: {
    type: String,
    required: 'File is required!'
  }
});

const User = mongoose.model('User', userSchema);

export default User;