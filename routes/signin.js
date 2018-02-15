module.exports = getDep => async (ctx, next) => {
    ctx.body = 'signin';
    next();
};
