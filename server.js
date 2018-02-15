const Koa = require('koa');
const session = require('koa-generic-session');
const MongoStore = require('koa-generic-session-mongo');
const Router = require('koa-router');
const { initServices } = require('./helpers/services');
const config = require('./server_config.json');

const app = new Koa();
const router = new Router();

/* -- Services -- */

const services = initServices(
    config.services,
    name => require(`./services/${name}`)
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
    ctx.response.redirect((await services).youtube.generateAuthUrl());
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
