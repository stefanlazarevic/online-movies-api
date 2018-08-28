const express = require('express');
const { Router } = express;

const CategoryRouter = Router();
const CategoryMoviesRouter = require('./category-movies.router');
const CategoryController = require('../../controllers/Category.controller');

const JWT_MIDDLEWARE = require('../middleware/jwt.middlware');

const httpStatus = require('../../config/httpStatus');

/**
 * @route /api/v{api_version}/categories
 * @method GET
 * @desc Get all available categories.
 * @access Public
 */
CategoryRouter.get('/', (request, response) => {
    CategoryController.getCategories().then(categories => {
        response.status(httpStatus.OK).json({
            status: httpStatus.OK,
            message: 'Action successfully completed.',
            data: categories
        });
    }).catch(err => {
        response.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            status: httpStatus.INTERNAL_SERVER_ERROR,
            message: err.message,
            data: []
        });
    });
});

/**
 * @route /api/v{api_version}/categories/{category_id}
 * @method GET
 * @desc Get category information.
 * @access Public
 */
CategoryRouter.get('/:id', (request, response) => {
    CategoryController.getCategory(request.params.id).then(category => {
        if (category) {
            response.status(httpStatus.OK).json({
                status: httpStatus.OK,
                message: 'Action successfully completed.',
                data: category
            });
        } else {
            response.status(httpStatus.NOT_FOUND).json({
                status: httpStatus.NOT_FOUND,
                message: 'Resource not found.',
                data: {}
            });
        }
    }).catch(err => {
        response.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            status: httpStatus.INTERNAL_SERVER_ERROR,
            message: err.message,
            data: []
        });
    });
});

/**
 * @route /api/v{api_version}/categories/{category_id}/movies
 * @method ALL
 * @desc Category movies middleware.
 * @access Public
 */
CategoryRouter.use('/:id/movies', (request, response, next) => {
    request.category_id = request.params.id;
    next();
}, CategoryMoviesRouter);

/**
 * Category private routes middleware.
 */
CategoryRouter.all('*', JWT_MIDDLEWARE);

/**
 * @route /api/v{api_version}/categories
 * @method POST
 * @desc Create new category.
 * @access Private
 */
CategoryRouter.post('/', (request, response) => {
    CategoryController.createCategory(request.body).then(category => {
        response.status(httpStatus.CREATED).json({
            status: httpStatus.CREATED,
            message: 'Resource successfully created.',
            data: category
        });
    }).catch(err => {
        response.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            status: httpStatus.INTERNAL_SERVER_ERROR,
            message: err.message,
            data: []
        });
    });
});

/**
 * @route /api/v{api_version}/categories/{category_id}
 * @method PUT
 * @desc Update category.
 * @access Private
 */
CategoryRouter.put('/:id', (request, response) => {
    CategoryController.updateCategory(request.params.id, request.body)
        .then(category => {
            response.status(httpStatus.OK).json({
                status: httpStatus.OK,
                message: 'Resource successfully updated.',
                data: category
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
 * @route /api/v{api_version}/categories/{category_id}
 * @method DELETE
 * @desc Delete category.
 * @access Private
 */
CategoryRouter.delete('/:id', (request, response) => {
    CategoryController.deleteCategory(request.params.id).then(() => {
        response.status(httpStatus.OK).json({
            status: httpStatus.OK,
            message: 'Resource successfully deleted.',
            data: {}
        });
    }).catch(err => {
        response.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            status: httpStatus.INTERNAL_SERVER_ERROR,
            message: err.message,
            data: []
        });
    });
});

module.exports = CategoryRouter;
