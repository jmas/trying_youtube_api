const { getStreamingService } = require('../../helpers/streaming_services');
const User = require('../../models/user');
const { getValidationErrors } = require('../../helpers/validate');
const userSchema = require('../../schemas/users.json');

async function saveUser(userRaw, users, ctx) {
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
            const tokens = await service.getAccessToken(code);
            const userFromService = await service.getAuthenticatedUser(tokens.access_token);
            const users = await getDep('users');
            const foundUser = await users.findOne({
                email: userFromService.email,
            });
            console.log('[auth/callback] foundUser', foundUser);
            if (foundUser) {
                ctx.body = foundUser.getRaw();
            } else {
                await saveUser({
                    ...service.formatUserData(userFromService),
                    service: ctx.params.service,   
                    tokens,
                }, users, ctx);
            }
        } catch (error) {
            console.log('[auth/callback] error', error);
        }
    }
};
