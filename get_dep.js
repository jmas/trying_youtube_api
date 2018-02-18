const lazyDeps = require('./helpers/lazy_deps');
const config = require('./server_config.json');

module.exports = lazyDeps({
    async db(getDep) {
        const { url, dbName } = config.db;
        const { MongoClient } = require('mongodb');
        const db = (await MongoClient.connect(url)).db(dbName);
        if (config.debug) {
            const MongoSchemer = require('mongo-schemer');
            return MongoSchemer.explainSchemaErrors(db, {
                onError: errors => console.log('[get_dep] db/explainSchemaErrors', errors),
            });
        }
        return db;
    },

    async users(getDep) {
        const Users = require('./repos/users');
        return new Users(await getDep('db'));
    },

    async youtube() {
        const Youtube = require('./streaming_services/youtube');
        return new Youtube(
            config.youtube.clientId,
            config.youtube.clientSecret,
            config.youtube.redirectUrl
        );
    },

    async twitch() {
        const Twitch = require('./streaming_services/twitch');
        return new Twitch({
            clientId: config.twitch.clientId,
            clientSecret: config.twitch.clientSecret,
            redirectUri: config.twitch.redirectUrl,
            scopes: ['user_read'],
        });
    },
});
