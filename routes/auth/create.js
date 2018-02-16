module.exports = getDep => async ctx => {
    if (ctx.session.user) {
        ctx.body = 'null';
        return;
    }
    if (ctx.request.query.service === 'youtube') {
        const youtube = await getDep('youtube');
        ctx.response.redirect(youtube.generateAuthUrl());
        return;
    }
};
