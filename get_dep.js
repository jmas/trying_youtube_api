const lazyDeps = require('./helpers/lazy_deps');
const config = require('./server_config.json');

module.exports = lazyDeps({
    async db(getDep) {
        const { url, dbName } = config.db;
        const { MongoClient } = require('mongodb');
        return (await MongoClient.connect(url)).db(dbName);
    },

    async users(getDep) {
        const Users = require('./repos/users');
        return new Users(await getDep('db'));
    },

    async youtube(getDep) {
        const Youtube = require('./classes/youtube');
        return new Youtube(
            config.youtube.clientId,
            config.youtube.clientSecret,
            config.youtube.redirectUrl
        );
    },
});
