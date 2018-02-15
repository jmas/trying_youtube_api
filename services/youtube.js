const { google } = require('googleapis');
const OAuth2 = google.auth.OAuth2;

async function create(options) {
    const {
        clientId,
        clientSecret,
        redirectUrl,
        scope = [
            'https://www.googleapis.com/auth/youtube.readonly',
        ],
    } = options;

    const oauth2Client = new OAuth2(
        clientId,
        clientSecret,
        redirectUrl
    );

    return {

        generateAuthUrl() {
            return oauth2Client.generateAuthUrl({
                access_type: 'offline',
                scope,
            });
        },

        
    };
}

module.exports = {
    create,
};
