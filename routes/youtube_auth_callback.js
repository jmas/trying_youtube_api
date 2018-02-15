module.exports = getDep => async (ctx, next) => {
    ctx.response.body = ctx.url;
    next();
};
