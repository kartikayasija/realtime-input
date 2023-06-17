const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Realtime Input',
      description: 'Realtime Input using Socket.io ',
      version: '1.0.0',
    },
  },
  apis: ['./*.js'],
}

const swaggerSpec = swaggerJsdoc(options)

exports.swaggerDocs=(app, port)=> {
  // Swagger Page
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

  // Documentation in JSON format
  app.get('/docs.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json')
    res.send(swaggerSpec)
  })
}
