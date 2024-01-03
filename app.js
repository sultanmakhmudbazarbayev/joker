import express from 'express';

// import bodyParser from 'body-parser';
// import cors from 'cors';

// import AppError from './api/errors/appError';
// import globalErrorHandler from './api/middlewares/globalErrorHandler';
// import apiRoutes from './api/routes';
// import errorCodes from './api/errors/errorCodes';

const app = express();

// app.use(express.static(__dirname + '../public'));
// app.use(cors());

// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());

/// Routes
// app.use(apiRoutes);

// /// For handling errors glabally
// app.use(globalErrorHandler);

// For every other routes
// app.all('*', (req, res, next) => {
//   next(new AppError(errorCodes.NOT_FOUND.msg, errorCodes.NOT_FOUND.code));
// });

export default app;
