module.exports = getDep => async (ctx, next) => {
    ctx.body = 'signup';
    next();
};
