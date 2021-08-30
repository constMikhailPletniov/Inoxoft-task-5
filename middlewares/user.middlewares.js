/* eslint-disable no-magic-numbers */
/* eslint-disable require-atomic-updates */
/* eslint-disable camelcase */
const { User } = require('../database');
const { ErrorHandler } = require('../errors/errors.handler');
const { BAD_REQUEST, CONFLICT, NOT_FOUND } = require('../config');
const { userCreateValidator } = require('../validator/users.validator');

module.exports = {
    isUserByIdExist: async (req, res, next) => {
        try {
            const { user_id } = req.params;

            const userFindId = await User.findById(user_id).
                select('+password').
                lean();

            if (!userFindId) {
                throw new ErrorHandler(NOT_FOUND, 'User by id not found!');
            }
            req.user = userFindId;
            next();

        } catch (err) {

            next(err);

        }
    },
    isUserValidData: async (req, res, next) => {
        try {
            const { err } = await userCreateValidator.validateAsync(req.body);

            if (err) {
                throw new ErrorHandler(BAD_REQUEST, err.details[0].message);
            }
            next();
        } catch (err) {
            next(err);
        }
    },
    isValidEmail: async (req, res, next) => {
        try {
            const { email = '' } = req.body;

            const userEmail = await User.findOne({ email: email.trim() });

            if (userEmail) {
                throw new ErrorHandler(CONFLICT, 'Email is already exist');
            }
            next();
        } catch (err) {
            next(err);
        }
    }
}
