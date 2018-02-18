module.exports = getDep => async ctx => {
    const logger = (await getDep('logger')).withNamespace('auth/user');
    logger.log('session', ctx.session);
    if (ctx.session.auth) {
        const { user } = ctx.session.auth
        ctx.body = user;
        ctx.status = 200;
    } else {
        ctx.throw(404, 'not found');
    }
};
