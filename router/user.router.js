/* eslint-disable new-cap */
/* eslint-disable max-len */
const router = require('express').Router();

const { userControl } = require('../controls');
const { isValidEmail, isUserByIdExist, isUserValidData } = require('../middlewares/user.middlewares');

router.get('/:user_id', isUserByIdExist, userControl.getUserById);
router.delete('/:user_id', isUserByIdExist, userControl.deleteUserById);
router.patch('/:user_id', isUserByIdExist, userControl.updateUser);

router.get('/', userControl.getAllUsers);
router.post('/', isValidEmail, isUserValidData, userControl.createUser);


module.exports = router;

