/**
 * @param {Function} getDep - get dependency
 * @returns {Function}
 */
module.exports = getDep => async ctx => {
    const logger = (await getDep('logger')).withNamespace('auth/user');
    const models = await getDep('models');
    const User = models.get('user');
    
    logger.log('session', ctx.session);
    
    if (!ctx.session.auth) {
        ctx.throw(404, 'not found');
    }

    const url = ctx.router.url('userView', {
        id: (new User(ctx.session.auth.user)).getId(),
    });

    logger.log('redirecting', url);
    
    ctx.redirect(url);
};
