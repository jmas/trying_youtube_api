const Koa = require('koa');
const path = require('path');
const session = require('koa-generic-session');
const SessionMongoStore = require('koa-generic-session-mongo');
const redisStore = require('koa-redis');
const Router = require('koa-router');
const config = require('./server_config.json');

const app = new Koa();

/* ~~ Session ~~ */

app.keys = config.session.keys;

app.use(session({
    store: redisStore({
        // Options specified here
    })
}));

/* ~~ Routing ~~ */

const router = new Router();
const routes = require('./routes.json');
const getDep = require('./get_dep');
const getRoute = name => require(`./routes/${name}`)(getDep);

routes.forEach(({ method, path, route }) => router[method](path, getRoute(route)));

/* ~~ Run ~~ */

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(config.server.port);
console.log(`Server listen ${config.server.port}...`);
