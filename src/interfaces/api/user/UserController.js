const { Router } = require('express');
const { inject } = require('awilix-express');

const UserController = {
  get router() {
    const router = Router();

    router.get('/', inject('getAllUsers'), this.getAll);
    router.post('/', inject('createUser'), this.create);

    return router;
  },

  getAll(req, res, next) {
    // TODO: implement
    console.log('Get all users');
    return 200;
  },

  create(req, res, next) {
    // TODO: implement
    console.log('Create user');
  }
};

module.exports = UserController;