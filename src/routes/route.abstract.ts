import { Router } from 'express';

abstract class MainRoute {
  private path = '/';

  protected router = Router();

  protected abstract setRoutes(): void

  public getPrefix(): string {
    return this.path;
  }

  public setPrefix(path: string): void {
    this.path = path;
  }

  public getRouter(): Router {
    return this.router;
  }
}

export default MainRoute;
