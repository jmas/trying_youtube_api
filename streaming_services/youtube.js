const { google } = require('googleapis');
const { OAuth2 } = google.auth;

class Youtube {
    constructor(
        clientId,
        clientSecret,
        redirectUrl,
        scope = [
            'https://www.googleapis.com/auth/youtube.readonly',
        ]
    ) {
        this._oauth2Client = new OAuth2(
            clientId,
            clientSecret,
            redirectUrl
        );
        this._scope = scope;
    }

    /**
     * @param {String} state 
     */
    getAuthorizationUrl(state) {
        return this._oauth2Client.generateAuthUrl({
            access_type: 'offline',
            scope: this._scope,
            state,
        });
    }

    async getAccessToken(code) {
        return {};
    }

    async getAuthenticatedUser(accessToken) {
        return {};
    }
    
    async getStreams() {
        return [];
    }

    formatUserData() {
        return {};
    }
}

module.exports = Youtube;
