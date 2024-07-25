const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const cors = require('cors');
const cookieParser = require('cookie-parser');
const fs = require('fs');
const https = require('https');
const logMiddleware = require('./middlewares/log.middleware');
require('dotenv').config();
const indexRouter = require('./routes/index');
const errorHandler = require('./middlewares/error-handler.middleware');
const resFormatter = require('./middlewares/res-formatter.middleware');
 
app.use(
    cors({
        origin: process.env.CLIENT_URL,
        credentials: true,
    }),
);
app.use(express.json());
app.use(cookieParser());

app.use(logMiddleware)

app.use(resFormatter)
app.use('/', indexRouter);
app.use(errorHandler)

https
    .createServer(
        {
            key: fs.readFileSync('./testdomain.nam+1-key.pem'),
            cert: fs.readFileSync('./testdomain.nam+1.pem'),
        },
        app,
    )
    .listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
