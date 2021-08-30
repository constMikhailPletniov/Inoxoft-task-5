/* eslint-disable camelcase */
const { Pest } = require('../database');
const { CONFLICT, NOT_FOUND } = require('../config');
const { ErrorHandler } = require('../errors/errors.handler');


module.exports = {
    isPestExistId: async (req, res, next) => {
        try {

            const { pest_id } = req.params;

            const pestFindId = await Pest.findById(pest_id);

            if (!pestFindId) {
                throw new ErrorHandler(NOT_FOUND, 'Pest by id not found!');
            }

            next();

        } catch (err) {
            next(err);
        }
    },
    isValidName: async (req, res, next) => {
        try {

            const { name = '' } = req.body;

            const pestName = await Pest.findOne({ name: name.trim() });

            if (pestName) {
                throw new ErrorHandler(CONFLICT, 'Pest is already exist');
            }
            next();

        } catch (err) {
            next(err);
        }
    }
}
