const bcrypt = require('bcrypt');

const { ErrorHandler } = require('../errors/errors.handler');
const { BAD_REQUEST, SALT } = require('../config/conf');

module.exports = {

    // eslint-disable-next-line no-magic-numbers
    hash: (password) => bcrypt.hash(password, SALT),
    // eslint-disable-next-line sort-keys
    compare: async (password, hashpassword) => {

        const isPassMatched = await bcrypt.compare(password, hashpassword);

        if (!isPassMatched) {
            // eslint-disable-next-line max-len
            throw new ErrorHandler(BAD_REQUEST, 'Your password or Your email are incorect');
        }

    }
}
