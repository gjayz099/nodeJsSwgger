const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Friend API Swagger',
      version: '1.0.0',
      description: "API endpoints for friend with Swagger",
    },
    servers: [
      {
        url: 'http://localhost:3000', // Adjust according to your server's URL
      },
    ],
  },
  apis: ['./routes/*.js'], // Ensure this points to your route files
};

const swaggerSpec = swaggerJsdoc(options);

function swaggerDocs(app, port) {
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  app.get('/docs.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  });

  console.log(`Swagger docs available at http://localhost:${port}/docs`);
}

module.exports = swaggerDocs;
