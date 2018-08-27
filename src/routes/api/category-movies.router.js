const express = require('express');
const { Router } = express;

const CategoryMoviesRouter = Router();
const MovieController = require('../../controllers/Movie.controller');

const JWT_MIDDLEWARE = require('../middleware/jwt.middlware');

const httpCode = require('../../config/httpCodes');

/**
 * @route /api/v{api_version}/categories/{category_id}/movies
 * @method GET
 * @desc Get all movies for passed category.
 * @access Public
 */
CategoryMoviesRouter.get('/', (request, response) => {
    MovieController.getMovies({ category_id: request.category_id })
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
 * @route /api/v{api_version}/categories/{category_id}/movies/{movie_id}
 * @method GET
 * @desc Get movies by id for passed category.
 * @access Public
 */
CategoryMoviesRouter.get('/:id', (request, response) => {
    MovieController.getMovie(request.params.id, { category_id: request.category_id })
        .then(movie => {
            if (movie) {
                response.status(httpCode.OK).json({
                    status: httpCode.OK,
                    message: 'Action successfully completed.',
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
 * Category private routes middleware.
 */
CategoryMoviesRouter.all('*', JWT_MIDDLEWARE);

/**
 * @route /api/v{api_version}/categories/{category_id}/movies
 * @method POST
 * @desc Create new movie under category.
 * @access Private
 */
CategoryMoviesRouter.post('/', (request, response) => {
    MovieController.createMovie({ ...request.body, category_id: request.category_id })
        .then(movie => {
            response.status(httpCode.CREATED).json({
                status: httpCode.CREATED,
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
 * @route /api/v{api_version}/categories/{category_id}/movies/{movie_id}
 * @method PUT
 * @desc Update movie under category.
 * @access Private
 */
CategoryMoviesRouter.put('/:id', (request, response) => {
    MovieController.updateMovie(request.params.id, { ...request.body, category_id: request.category_id })
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
 * @route /api/v{api_version}/categories/{category_id}/movies/{movie_id}
 * @method DELETE
 * @desc Delete movie under category.
 * @access Private
 */
CategoryMoviesRouter.delete('/:id', (request, response) => {
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

module.exports = CategoryMoviesRouter;
