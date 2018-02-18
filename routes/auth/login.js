const { getStreamingService } = require('../../helpers/streaming_services');

module.exports = getDep => async ctx => {
    const logger = (await getDep('logger')).withNamespace('auth/login');
    if (ctx.session.auth) {
        const url = ctx.router.url('authUser');
        logger.log('redirecting', url);
        ctx.redirect(url);
        return;
    }
    const service = await getStreamingService(ctx.params.service, getDep);
    const authUrl = await service.getAuthorizationUrl();
    logger.log('authUrl', authUrl);
    if (authUrl) {
        ctx.redirect(authUrl);
    }
};
