import express, { Express, json } from 'express';
import swaggerUi from 'swagger-ui-express';

import IRegistry from '../infra/registry/IRegistry';
import ProductOrderRouter from './product-order/ProductOrderRouter';

export default class Api {
  private readonly _server: Express;

  constructor(
    private readonly _registry: IRegistry,
    private readonly _port: number,
  ) {
    this._server = express();

    this._server.use(json());

    const swaggerOptions = _registry.get('swagger').options;

    this._server.use(
      '/swagger',
      swaggerUi.serve,
      swaggerUi.setup(swaggerOptions),
    );

    this._server.use(
      '/product-orders',
      new ProductOrderRouter(_registry).router,
    );
  }

  startListening() {
    this._server.listen(this._port, () => {
      const logger = this._registry.get('logger');

      logger.log(`Server started at port ${this._port}...`);
    });
  }
}
