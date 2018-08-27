const CategoryModel = require('../models/Category.model');
const mongoHelper = require('../helpers/mongo.helper');

class CategoryController {

    /**
     * @desc Get all categories.
     */
    getCategories() {
        return new Promise((resolve, reject) => {
            CategoryModel.find()
                .then(categories => resolve(categories))
                .catch(err => reject(err));
        });
    }

    /**
     * @desc Get category by id.
     */
    getCategory(id) {
        return new Promise((resolve, reject) => {
            if (mongoHelper.validateId(id)) {
                CategoryModel.findById(id)
                    .then(category => resolve(category))
                    .catch(err => reject(err));
            } else {
                resolve();
            }
        });
    }

    /**
     * @desc Create new category.
     */
    createCategory(data) {
        return new Promise((resolve, reject) => {
            CategoryModel.create(data)
                .then(category => resolve(category))
                .catch(err => reject(err));
        });
    }

    /**
     * @desc Update category.
     */
    updateCategory(id, data) {
        return new Promise((resolve, reject) => {
            if (mongoHelper.validateId(id)) {
                CategoryModel.findByIdAndUpdate(id, data)
                    .then(category => resolve(category))
                    .catch(err => reject(err));
            } else {
                resolve();
            }
        });
    }

    /**
     * @desc Delete category.
     */
    deleteCategory(id) {
        return new Promise((resolve, reject) => {
            if (mongoHelper.validateId(id)) {
                CategoryModel.findByIdAndRemove(id)
                    .then(() => resolve())
                    .catch(err => reject(err));
            } else {
                resolve();
            }
        });
    }
}

module.exports = new CategoryController();
