/* eslint-disable new-cap */
/* eslint-disable max-len */
const router = require('express').Router();

const { pestMiddleWare } = require('../middlewares');
const { pestControl } = require('../controls');

router.get('/', pestControl.getAllPests);
router.post('/', pestMiddleWare.isValidName, pestControl.createPest);

router.get('/:pest_id', pestMiddleWare.isPestExistId, pestControl.getPestsById);
router.delete('/:pest_id', pestMiddleWare.isPestExistId, pestControl.deletePestById);
router.patch('/:pest_id', pestMiddleWare.isPestExistId, pestMiddleWare.isValidName, pestControl.updatePest);

module.exports = router;
