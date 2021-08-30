/* eslint-disable camelcase */
/* eslint-disable no-magic-numbers */
const { Pest } = require('../database');
const { BAD_REQUEST, CREATE } = require('../config');
const { pestService } = require('../services');

module.exports = {

    createPest: async (req, res, next) => {
        try {
            const createPest = await Pest.create(req.body);

            res.status(CREATE).json(createPest);

        } catch (err) {
            next(err);
        }
    },
    deletePestById: async (req, res, next) => {
        try {
            const { pest_id } = req.params;

            const pestDelete = await Pest.findByIdAndDelete(pest_id);

            res.status(200).json(pestDelete);
        } catch (err) {
            next(err);
        }
    },
    getAllPests: async (req, res) => {
        try {
            const Pests = await pestService.getPests();
            res.status(200).json(Pests);

        } catch (err) {
            res.status(BAD_REQUEST).json(err.message);
        }
    },
    getPestsById: async (req, res, next) => {
        try {
            const { pest_id } = req.params;

            const findPest = await Pest.findById(pest_id);

            res.status(200).json(findPest);

        } catch (err) {
            next(err);
        }
    },
    updatePest: async (req, res, next) => {
        try {
            const data = req.body;
            const { pest_id } = req.params;

            await Pest.findByIdAndUpdate(pest_id, data);

            res.status(200).json({ message: 'The data was update' });

        } catch (err) {
            next(err);
        }
    }

}
