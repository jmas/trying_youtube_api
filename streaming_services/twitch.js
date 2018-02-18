const TwitchApi = require('twitch-api');

class Twitch {
    constructor(options) {
        this._api = new TwitchApi(options);
    }

    getAuthorizationUrl() {
        return this._api.getAuthorizationUrl();
    }

    async getAccessToken(code) {
        return new Promise((resolve, reject) => {
            this._api.getAccessToken(code, (err, body) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(body);
                }
            });
        });
    }

    async getAuthenticatedUser(accessToken) {
        return new Promise((resolve, reject) => {
            this._api.getAuthenticatedUser(accessToken, (err, body) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(body);
                }
            });
        });
    }

    async getStreams(parameters) {
        return new Promise((resolve, reject) => {
            this._api.getStreams(parameters, (err, body) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(body.streams);
                }
            });
        });
    }
    
    formatUserData({ display_name, name, email, logo, bio }) {
        return {
            displayName: display_name,
            name,
            email,
            avatarUrl: logo,
            bio,
        };
    }
}

module.exports = Twitch;
