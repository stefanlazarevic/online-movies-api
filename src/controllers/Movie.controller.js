const MovieModel = require('../models/Movie.model');
const mongoHelper = require('../helpers/mongo.helper');

class MovieController {

    /**
     * @desc Get all movies.
     */
    getMovies(query = {}) {
        return new Promise((resolve, reject) => {
            MovieModel.find(query)
                .then(movies => resolve(movies))
                .catch(err => reject(err));
        });
    }

    /**
     * @desc Get movie
     */
    getMovie(id, query = {}) {
        return new Promise((resolve, reject) => {
            if (mongoHelper.validateId(id)) {
                MovieModel.findOne({ _id: id, ...query})
                    .then(movie => resolve(movie))
                    .catch(err => reject(err));
            } else {
                resolve();
            }
        });
    }

    /**
     * @desc Create movie
     */
    createMovie(data) {
        return new Promise((resolve, reject) => {
            MovieModel.create(data)
                .then(movie => resolve(movie))
                .catch(err => reject(err));
        });
    }

    /**
     * @desc Update movie
     */
    updateMovie(id, data) {
        return new Promise((resolve, reject) => {
            if (mongoHelper.validateId(id)) {
                MovieModel.findByIdAndUpdate(id, data)
                    .then(movie => resolve(movie))
                    .catch(err => reject(err));
            } else {
                resolve();
            }
        });
    }

    /**
     * @desc Delete movie
     */
    deleteMovie(id) {
        return new Promise((resolve, reject) => {
            if (mongoHelper.validateId(id)) {
                MovieModel.findByIdAndRemove(id)
                    .then(() => resolve())
                    .catch(err => reject(err));
            } else {
                resolve();
            }
        });
    }
}

module.exports = new MovieController();
