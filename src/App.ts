import express from 'express';
import router from './routes/router';

class App {
  public app: express.Application;

  constructor() {
    this.app = express();
    this.config();
    this.routerSetup();
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
}

export default new App().app;
