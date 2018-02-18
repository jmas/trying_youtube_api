const path = require('path');
const Koa = require('koa');
const session = require('koa-generic-session');
const SessionMongoStore = require('koa-generic-session-mongo');
const redisStore = require('koa-redis');
const json = require('koa-json');
const serve = require('koa-static');
const createRouter = require('./helpers/create_router');
const config = require('./config.json');
const routes = require('./routes.json');
const getDep = require('./get_dep');
const app = new Koa();

(async () => {

    /* ~~ Setup: Logger & Error handling ~~ */
    
    const logger = (await getDep('logger')).withNamespace('app');

    app.use(async (ctx, next) => {
        try {
            await next();
        } catch (error) {
            ctx.status = error.status || 500;
            ctx.body = config.debug ? error.message: 'Internal Server Error';
            logger.error('error', error);
        }
    });

    app.on('error', error => {
        logger.error('error', error);
    });

    /* ~~ Setup: Static ~~ */

    if (process.env.STATIC_PATH) {
        logger.log('STATIC_PATH', process.env.STATIC_PATH);
        app.use(serve(process.env.STATIC_PATH));
    }

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
