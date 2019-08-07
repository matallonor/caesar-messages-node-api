const Operation = require('../Operation');

class GetAllUsers extends Operation {
  constructor({ userRepository }) {
    super();
    this.userRepository = userRepository;
  }
  // TODO: Define the get users operation
}

module.exports = GetAllUsers;
