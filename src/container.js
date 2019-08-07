const { createContainer, asClass, asFunction, asValue } = require('awilix');
const { scopePerRequest } = require('awilix-express');

const config = require('../config');
const Application = require('./app/Application');
const { CreateUser, GetAllUsers } = require('./app/user');

const Server = require('./interfaces/api/Server');
const router = require('./interfaces/api/router');
const loggerMiddleware = require('./interfaces/api/logging/loggerMiddleware');
const errorHandler = require('./interfaces/api/errors/errorHandler');
const devErrorHandler = require('./interfaces/api/errors/devErrorHandler');

const logger = require('./infra/logging/logger');
const { mongoose } = require('./infra/database/mongoose');
const UserRepository = require('./infra/database/mongoose/repositories/UserRepository');
const { UserModel } = require('./infra/database/mongoose/models/User');

const container = createContainer();

// System
container
    .register({
        app: asClass(Application).singleton(),
        server: asClass(Server).singleton()
    })
    .register({
        router: asFunction(router).singleton(),
        logger: asFunction(logger).singleton()
    })
    .register({
        config: asValue(config)
    });

// Middlewares
container
    .register({
        loggerMiddleware: asFunction(loggerMiddleware).singleton()
    })
    .register({
        containerMiddleware: asValue(scopePerRequest(container)),
        errorHandler: asValue(config.production ? errorHandler : devErrorHandler)
    });

// Database
container.register({
  mongoose: asValue(mongoose)
});

// Repositories
container.register({
  userRepository: asClass(UserRepository).singleton()
});

// Models
container.register({
  userModel: asValue(UserModel)
});

// Operations
container.register({
  createUser: asClass(CreateUser),
  getAllUsers: asClass(GetAllUsers)
});

module.exports = container;
