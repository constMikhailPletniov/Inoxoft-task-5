/* eslint-disable max-len */
/* eslint-disable camelcase */
/* eslint-disable no-magic-numbers */


const { BAD_REQUEST, CREATE } = require('../config/conf');
const { User } = require('../database');
const { pasService } = require('../services');
const { userNormalize } = require('../utils/user.util');

module.exports = {
    createUser: async (req, res, next) => {
        try {
            const { password } = req.body;

            const hashPass = await pasService.hash(password);

            await User.create({
                ...req.body,
                password: hashPass
            });
            res.status(CREATE).json({ message: 'New user is create' });
        } catch (err) {
            next(err);
        }
    },
    deleteUserById: async (req, res, next) => {
        try {
            const { user_id } = req.params;

            const userDelete = await User.findByIdAndDelete(user_id).select('-__v -role -password');

            res.status(200).json(userDelete);
        } catch (err) {
            next(err);
        }
    },
    getAllUsers: async (req, res) => {
        try {
            const users = await User.find({}).select('-__v -role -password');
            res.json(users);
        } catch (err) {
            res.status(BAD_REQUEST).json(err.message);
        }
    },
    getUserById: (req, res, next) => {
        try {
            const userNorm = userNormalize(req.user);
            res.json(userNorm);
        } catch (err) {
            next(err);
        }
    },
    updateUser: async (req, res, next) => {
        try {
            const { user_id } = req.params;
            const { ...data } = req.body;

            await User.findByIdAndUpdate(user_id, data);

            res.status(CREATE).json({ message: 'The data was update' });

        } catch (err) {
            next(err);
        }
    }
}
