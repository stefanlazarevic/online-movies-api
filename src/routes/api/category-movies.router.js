const express = require('express');
const { Router } = express;

const CategoryMoviesRouter = Router();
const MovieController = require('../../controllers/Movie.controller');

const JWT_MIDDLEWARE = require('../middleware/jwt.middlware');

const httpStatus = require('../../config/httpStatus');

/**
 * @route /api/v{api_version}/categories/{category_id}/movies
 * @method GET
 * @desc Get all movies for passed category.
 * @access Public
 */
CategoryMoviesRouter.get('/', (request, response) => {
    MovieController.getMovies({ category_id: request.category_id })
        .then(movies => {
            response.status(httpStatus.OK).json({
                status: httpStatus.OK,
                message: 'Action successfully completed.',
                data: movies
            });
        })
        .catch(err => {
            response.status(httpStatus.INTERNAL_SERVER_ERROR).json({
                status: httpStatus.INTERNAL_SERVER_ERROR,
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
                response.status(httpStatus.OK).json({
                    status: httpStatus.OK,
                    message: 'Action successfully completed.',
                    data: movie,
                });
            } else {
                response.status(httpStatus.NOT_FOUND).json({
                    status: httpStatus.NOT_FOUND,
                    message: 'Resource not found.',
                    data: {}
                });
            }
        })
        .catch(err => {
            response.status(httpStatus.INTERNAL_SERVER_ERROR).json({
                status: httpStatus.INTERNAL_SERVER_ERROR,
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
            response.status(httpStatus.CREATED).json({
                status: httpStatus.CREATED,
                message: 'Resource successfully created.',
                data: movie
            });
        })
        .catch(err => {
            response.status(httpStatus.INTERNAL_SERVER_ERROR).json({
                status: httpStatus.INTERNAL_SERVER_ERROR,
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
                response.status(httpStatus.OK).json({
                    status: httpStatus.OK,
                    message: 'Resource successfully updated.',
                    data: movie,
                });
            } else {
                response.status(httpStatus.NOT_FOUND).json({
                    status: httpStatus.NOT_FOUND,
                    message: 'Resource not found.',
                    data: {}
                });
            }
        })
        .catch(err => {
            response.status(httpStatus.INTERNAL_SERVER_ERROR).json({
                status: httpStatus.INTERNAL_SERVER_ERROR,
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
            response.status(httpStatus.OK).json({
                status: httpStatus.OK,
                message: 'Resource successfully deleted.',
                data: {}
            });
        })
        .catch(err => {
            response.status(httpStatus.INTERNAL_SERVER_ERROR).json({
                status: httpStatus.INTERNAL_SERVER_ERROR,
                message: err.message,
                data: []
            });
        });
});

module.exports = CategoryMoviesRouter;
