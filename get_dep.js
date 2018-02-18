const lazyDeps = require('./helpers/lazy_deps');
const config = require('./config.json');

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

    async logger() {
        const defColor = '\x1b[0m';
        const logColor = '\x1b[30m\x1b[47m';
        const infoColor = '\x1b[37m\x1b[44m';
        const errorColor = '\x1b[37m\x1b[41m';
        const warnColor = '\x1b[37m\x1b[43m';
        function log(namespace, color='', ...args) {
            if (config.debug) {
                console.log(`${color}[${namespace}]${defColor}`, ...args);
            }
        }
        return {
            withNamespace(namespace) {
                return {
                    log(...args) {
                        log(namespace, logColor, ...args);
                    },
                    info(...args) {
                        log(namespace, infoColor, ...args);
                    },
                    error(...args) {
                        log(namespace, errorColor, ...args);
                    },
                    warn(...args) {
                        log(namespace, warnColor, ...args);
                    },
                };
            },
        };
    },
});
