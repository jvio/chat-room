'use strict';

var SwaggerExpress = require('swagger-express-mw');
var serveStatic = require('serve-static');
var app = require('express')();
module.exports = app; // for testing

var config = {
  appRoot: __dirname // required config
};

SwaggerExpress.create(config, function(err, swaggerExpress) {
  if (err) { throw err; }

  // install middleware
  swaggerExpress.register(app);

  // install response validation listener (this will only be called if there actually are any errors or warnings)
  swaggerExpress.runner.on('responseValidationError', function(validationResponse, request, response) {
    // log your validation errors here...
    console.error(validationResponse.errors);
  });

  var port = process.env.PORT || 10010;
  app.listen(port);

  // servers assets in case needed
  app.use(serveStatic('assets'));

  if (swaggerExpress.runner.swagger.paths['/conversations']) {
    console.log('try this:\ncurl http://127.0.0.1:' + port + '/conversations');
  }
});
