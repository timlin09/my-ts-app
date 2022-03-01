require('dotenv').config();

/**
 * Swagger UI 設定
 */
const swagger = {
  swaggerDefinition: {
    info: {
      title: 'My-Ts-App API',
      description: 'APIs for My-Ts-App backend',
      version: '0.1',
    },
    host: `${process.env.HOST}:${process.env.PORT}`, // process.env.DOMAIN_NAME || 'localhost:3000',
    produces: ['application/json'],
    schemes: ['http', 'https'],
    securityDefinitions: {
      Bearer: {
        type: 'apiKey',
        in: 'cookie',
        name: 'Authorization',
        description: 'JWT token',
      },
    },
  },
  route: {
    url: '/api-docs',
    docs: '/api-docs.json',
  },
  basedir: __dirname,
  files: ['./**/*.ts'],
};

export default swagger;
