const Koa = require('koa');
const path = require('path');
const session = require('koa-generic-session');
const MongoStore = require('koa-generic-session-mongo');
const Router = require('koa-router');
const config = require('./server_config.json');
const Youtube = require('./classes/Youtube');

const app = new Koa();
const router = new Router();
const youtube = new Youtube(
    config.youtube.clientId,
    config.youtube.clientSecret,
    config.youtube.redirectUrl
);

/* -- Session -- */

app.keys = config.session.keys;

app.use(session({
    store: new MongoStore({
        host: config.session.mongoHost,
    }),
}));

/* -- Routing -- */

router.get('/youtube_auth', async (ctx, next) => {
    ctx.response.redirect(youtube.generateAuthUrl());
    next();
});

router.get('/youtube_auth_callback', (ctx, next) => {
    console.log(ctx.request);
    ctx.response.body = ctx.url;
    next();
});

/* -- Run -- */

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(config.server.port);
console.log(`Server listen ${config.server.port}...`);
