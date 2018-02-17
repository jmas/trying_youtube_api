const { getStreamingService } = require('../../helpers/streaming_services');
const User = require('../../models/user');
const { getValidationErrors } = require('../../helpers/validate');
const userSchema = require('../../schemas/users.json');

async function saveUser(userFromService, service, users, ctx) {
    const userRaw = service.formatUserData(userFromService);
    const errors = getValidationErrors(userRaw, userSchema);
    if (errors.length === 0) {
        ctx.body = (await users.save(new User(userRaw))).getRaw();
    } else {
        ctx.status = 400;
        ctx.body = errors;
    }
}

module.exports = getDep => async ctx => {
    const code = ctx.query.code;
    console.log('[auth/callback] code', code);
    if (code) {
        try {
            const service = await getStreamingService(ctx.params.service, getDep);
            const { access_token } = await service.getAccessToken(code);
            const userFromService = await service.getAuthenticatedUser(access_token);
            const users = await getDep('users');
            const foundUser = await users.findOne({
                email: userFromService.email,
            });
            console.log('[auth/callback] foundUser', foundUser);
            if (foundUser) {
                ctx.body = foundUser.getRaw();
            } else {
                await saveUser(userFromService, service, users, ctx);
            }
        } catch (error) {
            console.log('[auth/callback] error', error);
        }
    }
};
