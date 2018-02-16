module.exports = getDep => async ctx => {
    ctx.body = ctx.session.user || 'null';
};
