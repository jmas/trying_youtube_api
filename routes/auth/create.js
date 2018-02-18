const { getStreamingService } = require('../../helpers/streaming_services');

module.exports = getDep => async ctx => {
    const logger = (await getDep('logger')).withNamespace('auth/create');
    if (ctx.session.user) {
        ctx.body = null;
        return;
    }
    try {
        const service = await getStreamingService(ctx.params.service, getDep);
        const authUrl = await service.getAuthorizationUrl();
        logger.log('authUrl', authUrl);
        if (authUrl) {
            ctx.response.redirect(authUrl);
        }
    } catch (error) {
        logger.log('error', error);
    }
};
