module.exports = getDep => async ctx => {
    const { id } = ctx.params;
    const users = await getDep('users');
    const user = await users.findById(id);

    if (!user) {
        ctx.throw(404, 'not found');
        return;
    }
    
    ctx.body = user.getPublicRaw();
};
