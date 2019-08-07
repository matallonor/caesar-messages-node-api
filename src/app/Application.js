class Application {
  constructor({ server, mongoose, logger }) {
    this.server = server;
    this.mongoose = mongoose;
    this.logger = logger;

    if(mongoose && mongoose.options.logging) {
      mongoose.options.logging = logger.info.bind(logger);
    }
  }

  async start() {
    if(this.mongoose) {
      await this.mongoose.authenticate();
    }

    await this.server.start();
  }
}

module.exports = Application;
