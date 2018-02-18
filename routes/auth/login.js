/**
 * @param {Function} getDep - get dependency
 * @returns {Function}
 */
module.exports = getDep => async ctx => {
    const logger = (await getDep('logger')).withNamespace('auth/login');
    const { getStreamingService } = (await getDep('helpers')).get('streaming_services');
    
    if (ctx.session.auth) {
        const url = ctx.router.url('authUser');
        logger.log('redirecting', url);
        ctx.redirect(url);
        return;
    }
    
    const service = await getStreamingService(ctx.params.service, getDep);
    const authUrl = await service.getAuthorizationUrl();
    
    logger.log('authUrl', authUrl);
    
    if (!authUrl) {
        throw `Can't generate 'authUrl'.`;
    }

    ctx.redirect(authUrl);
};
