module.exports = getDep => async (ctx, next) => {
    const youtube = await getDep('youtube');
    ctx.response.redirect(youtube.generateAuthUrl());
    next();
};
