const Koa = require('koa');
const path = require('path');
const session = require('koa-generic-session');
const SessionMongoStore = require('koa-generic-session-mongo');
const redisStore = require('koa-redis');
const createRouter = require('./helpers/create_router');
const json = require('koa-json');
const config = require('./config.json');
const routes = require('./routes.json');
const getDep = require('./get_dep');
const app = new Koa();

(async () => {

    /* ~~ Setup: Logger ~~ */
    
    const logger = (await getDep('logger')).withNamespace('app');

    app.on('error', error => logger.error('error', error));

    /* ~~ Setup: Output ~~ */

    app.use(json());

    /* ~~ Setup: Session ~~ */

    app.keys = config.session.keys;

    app.use(session({
        store: redisStore(),
    }));

    /* ~~ Setup: Routing ~~ */

    try {
        const router = await createRouter(
            routes,
            name => require(`./routes/${name}`),
            getDep
        );
        app.use(router.routes());
        app.use(router.allowedMethods());
    } catch (error) {
        logger.log('createRouter', error);
    }

    /* ~~ Run ~~ */

    app.listen(config.server.port);
    logger.info(`Server listen ${config.server.port}...`);

})();
