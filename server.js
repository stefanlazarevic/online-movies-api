require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

const authentificationRouter = require('./src/routes/api/authentification.router');
const categoryRouter = require('./src/routes/api/category.router');
const moviesRouter = require('./src/routes/api/movies.router');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(`/api/v${process.env.APP_API_VERSION}/auth/`, authentificationRouter);
app.use(`/api/v${process.env.APP_API_VERSION}/categories/`, categoryRouter);
app.use(`/api/v${process.env.APP_API_VERSION}/movies/`, moviesRouter);

app.use('*', (request, response) => {
    response.status(404).json({
        code: 404,
        data: {
            message: 'Endpoint not found.',
        }
    })
});

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true }).then(() => {
    console.log('MongoDB connected');
}).catch(err => console.error(`MongoDB Failed to connect: ${err}`));

app.listen(process.env.APP_PORT, () => {
    console.log(`Server started on port ${process.env.APP_PORT}`);
});
