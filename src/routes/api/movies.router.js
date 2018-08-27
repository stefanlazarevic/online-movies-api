const express = require('express');
const { Router } = express;

const MovieRouter = Router();
const MovieController = require('../../controllers/Movie.controller');

const JWT_MIDDLEWARE = require('../middleware/jwt.middlware');

const httpCode = require('../../config/httpCodes');

/**
 * @route /api/v{version_number}/movies
 * @method GET
 * @desc Get all movies.
 * @access Public
 */
MovieRouter.get('/', (request, response) => {
    MovieController.getMovies()
        .then(movies => {
            response.status(httpCode.OK).json({
                status: httpCode.OK,
                message: 'Action successfully completed.',
                data: movies
            });
        })
        .catch(err => {
            response.status(httpCode.INTERNAL_SERVER_ERROR).json({
                status: httpCode.INTERNAL_SERVER_ERROR,
                message: err.message,
                data: []
            });
        });
});

/**
 * @route /api/v{version_number}/movies/{movie_id}
 * @method GET
 * @desc Get movie by id.
 * @access Public
 */
MovieRouter.get('/:id', (request, response) => {
    console.log(request.params.id);
    MovieController.getMovie(request.params.id)
        .then(movie => {
            if (movie) {
                response.status(httpCode.OK).json({
                    status: httpCode.OK,
                    message: 'Action successfully completed.',
                    data: movie,
                });
            } else {
                console.log('ok');
                response.status(httpCode.NOT_FOUND).json({
                    status: httpCode.NOT_FOUND,
                    message: 'Resource not found.',
                    data: {}
                });
            }
        })
        .catch(err => {
            response.status(httpCode.INTERNAL_SERVER_ERROR).json({
                status: httpCode.INTERNAL_SERVER_ERROR,
                message: err.message,
                data: []
            });
        });
});

/**
 * Movies private routes middleware.
 */
MovieRouter.all('*', JWT_MIDDLEWARE);

/**
 * @route /api/v{version_number}/movies/
 * @method POST
 * @desc Create new movie.
 * @access Private
 */
MovieRouter.post('/', (request, response) => {
    MovieController.createMovie(request.body)
        .then(movie => {
            response.status(httpCode.OK).json({
                status: httpCode.OK,
                message: 'Resource successfully created.',
                data: movie
            });
        })
        .catch(err => {
            response.status(httpCode.INTERNAL_SERVER_ERROR).json({
                status: httpCode.INTERNAL_SERVER_ERROR,
                message: err.message,
                data: []
            });
        });
});

/**
 * @route /api/v{version_number}/movies/{movie_id}
 * @method PUT
 * @desc Update movie.
 * @access Private
 */
MovieRouter.put('/:id', (request, response) => {
    MovieController.updateMovie(request.params.id)
        .then(movie => {
            if (movie) {
                response.status(httpCode.OK).json({
                    status: httpCode.OK,
                    message: 'Resource successfully updated.',
                    data: movie,
                });
            } else {
                response.status(httpCode.NOT_FOUND).json({
                    status: httpCode.NOT_FOUND,
                    message: 'Resource not found.',
                    data: {}
                });
            }
        })
        .catch(err => {
            response.status(httpCode.INTERNAL_SERVER_ERROR).json({
                status: httpCode.INTERNAL_SERVER_ERROR,
                message: err.message,
                data: []
            });
        });
});

/**
 * @route /api/v{version_number}/movies/{movie_id}
 * @method DELETE
 * @desc Delete movie.
 * @access Private
 */
MovieRouter.delete('/:id', (request, response) => {
    MovieController.deleteMovie(request.params.id)
        .then(() => {
            response.status(httpCode.OK).json({
                status: httpCode.OK,
                message: 'Resource successfully deleted.',
                data: {}
            });
        })
        .catch(err => {
            response.status(httpCode.INTERNAL_SERVER_ERROR).json({
                status: httpCode.INTERNAL_SERVER_ERROR,
                message: err.message,
                data: []
            });
        });
});

module.exports = MovieRouter;
