const { getStreamingService } = require('../../helpers/streaming_services');

module.exports = getDep => async ctx => {
    if (ctx.session.user) {
        ctx.body = null;
        return;
    }
    try {
        const service = await getStreamingService(ctx.params.service, getDep);
        const authUrl = await service.getAuthorizationUrl();
        console.log('[auth/create] authUrl', authUrl);
        if (authUrl) {
            ctx.response.redirect(authUrl);
        }
    } catch (error) {
        console.log('[auth/create] error', error);
    }
};
