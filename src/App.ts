import express from 'express';
import router from './routes/router';
import dbInit from './db/init';

class App {
  public app: express.Application;

  private dbInit: Function = dbInit;

  constructor() {
    this.app = express();
  }

  async init() {
    this.config();
    this.routerSetup();
    await this.dbConnect();
  }

  private config(): void {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  private routerSetup(): void {
    router.forEach((route) => {
      this.app.use(route.getPrefix(), route.getRouter());
    });
  }

  private async dbConnect(): Promise<void> {
    await this.dbInit();
  }
}

const service = new App();

service.init();

export default service.app;
