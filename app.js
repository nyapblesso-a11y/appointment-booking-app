import createError from 'http-errors';
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';


import indexRouter from './routes/index.js';
import authRouter from './routes/auth-routes.js'
import appointRouter from './routes/appointment-routes.js'
import slotRouter from './routes/slot-routes.js'

var app = express();


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', indexRouter);
app.use('/auth', authRouter)
app.use('/app', appointRouter)
app.use('/slot', slotRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});
// error handler
app.use(function (err, req, res, next) {
  const statusCode = err.status || 500;
  res.status(statusCode);
  res.send({
    error: {
      status: statusCode,
      message: err.message,
      stack: req.app.get('env') === 'development' ? err.stack : {}
    }
  });
});

export default app;
