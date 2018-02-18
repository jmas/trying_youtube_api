async function saveUser(user, users, getValidationErrors) {
    const errors = getValidationErrors(user.getRaw());
    if (errors.length > 0) {
        throw `Can't save auth user because have validation errors.`;
    }
    return await users.save(user);
}

module.exports = getDep => async ctx => {
    const helpers = await getDep('helpers');
    const models = await getDep('models');
    const logger = (await getDep('logger')).withNamespace('auth/login_callback');
    const getValidationErrors = (await getDep('validator')).get('users');
    const User = models.get('user');
    const { getStreamingService } = helpers.get('streaming_services');
    const code = ctx.query.code;

    if (!code) {
        ctx.throw(400, 'code is required');
        return;
    }
    logger.log('code', code);

    const service = await getStreamingService(ctx.params.service, getDep);
    const tokens = await service.getAccessToken(code);
    const userFromService = await service.getAuthenticatedUser(tokens.access_token);
    const users = await getDep('users');
    const foundUser = await users.findOne({
        email: userFromService.email,
    });
    const user = foundUser ? foundUser: await saveUser(new User({
        ...service.formatUserData(userFromService),
        service: ctx.params.service,   
        tokens,
    }), users, getValidationErrors);
    
    logger.log('user', user);
    
    ctx.session.auth = {
        user: user.getRaw(),
    };
    ctx.redirect(ctx.router.url('authUser'));
};
