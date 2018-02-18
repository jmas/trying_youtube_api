const { getStreamingService } = require('../../helpers/streaming_services');
const User = require('../../models/user');
const { getValidationErrors } = require('../../helpers/validate');
const userSchema = require('../../schemas/users.json');

async function saveUser(user, users) {
    const errors = getValidationErrors(user.getRaw(), userSchema);
    if (errors.length === 0) {
        return await users.save(user);
    }
}

module.exports = getDep => async ctx => {
    const logger = (await getDep('logger')).withNamespace('auth/login_callback');
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
    }));
    logger.log('user', user);
    ctx.session.auth = {
        user: user.getRaw(),
    };
    ctx.redirect(ctx.router.url('authUser'));
};
