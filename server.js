const Koa = require('koa');
const path = require('path');
const session = require('koa-generic-session');
const MongoStore = require('koa-generic-session-mongo');
const Router = require('koa-router');
const config = require('./server_config.json');
const getDep = require('./get_dep');

const app = new Koa();
const router = new Router();

/* ~~ Session ~~ */

app.keys = config.session.keys;

app.use(session({
    store: new MongoStore({
        host: config.session.mongoHost,
    }),
}));

/* ~~ Routing ~~ */

const getRoute = name => require(`./routes/${name}`)(getDep);

router.get('/signin', getRoute('signin'));
router.get('/signup', getRoute('signup'));
router.get('/youtube_auth', getRoute('youtube_auth'));
router.get('/youtube_auth_callback', getRoute('youtube_auth_callback'));

/* ~~ Run ~~ */

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(config.server.port);
console.log(`Server listen ${config.server.port}...`);
