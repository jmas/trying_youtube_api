module.exports = getDep => async (ctx, next) => {
    var session = ctx.session;
    session.count = session.count || 0;
    session.count++;
    ctx.body = session.count;
};
