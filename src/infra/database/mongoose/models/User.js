const { Schema } = require('mongoose');

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true
    },
    password: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

module.exports = ({ mongoose }) => {
  const model = mongoose.model('User', userSchema);
  return model;
};