const createError = require('http-errors');
const express = require('express');
const logger = require('morgan');
const bodyparser = require('body-parser');
const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require("swagger-jsdoc");
const cors = require('cors');
const driverRouter = require('./routes/driver');
const { application } = require('express');

const app = express();
app.use(logger('dev'));


const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Cab booking application for driver",
      version: "1.0.0",
      description: "Cab booking system library"
    },
    servers: [
      {
        url: "https://localhost:3000"
      }
    ]
  },
  apis: ["./routes/*.js"]
}

const specs = swaggerJsDoc(options);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs))

//Passing through body parser middleware so that the request body can be read
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));

//handle cors policy
app.use(cors());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use('/api/driver', driverRouter);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // send error response
  res.status(err.status || 500);
  res.send('error');
});

const port = process.env.PORT || 3000;
app.listen(port);
