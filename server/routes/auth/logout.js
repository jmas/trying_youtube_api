/**
 * @param {Function} getDep - get dependency
 * @returns {Function}
 */
module.exports = getDep => async ctx => {
    ctx.session.auth = null;
    ctx.status = 200;
};
