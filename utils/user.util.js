/* eslint-disable no-param-reassign */
const userNormalize = (normalize) => {
    const fieldRemove = [
        'password',
        '__v',
        'role'
    ];
    fieldRemove.forEach((field) => delete normalize[field]);
    return normalize;
};

module.exports = {
    userNormalize
}
