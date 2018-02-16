module.exports = getDep => async ctx => {
    ctx.response.body = ctx.url;
};
