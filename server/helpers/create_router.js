const Router = require('koa-router');

module.exports = async (routes, requireRoute, getDep) => {
    const router = new Router();
    const getRoute = name => requireRoute(name)(getDep);
    
    routes.forEach(({ method, path, route, name=null }) => {
        if (name) {
            router[method](name, path, getRoute(route));
        } else {
            router[method](path, getRoute(route));
        }
    });
    
    return router;
};
