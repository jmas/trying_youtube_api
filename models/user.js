const Model = require('../classes/model');

class User extends Model {
    constructor(raw) {
        super({
            displayName:            '',
            name:                   '',
            email:                  '',
            avatarUrl:              '',
            bio:                    '',
            live:                   false,
            streamInfo:             {},
            streamInfoUpdateDate:   undefined,
            ...raw,
        });
    }

    getPublicRaw() {
        const {
            displayName,
            name,
            email,
            avatarUrl,
            bio,
            live,
        } = this.getRaw();
        return {
            displayName,
            name,
            email,
            avatarUrl,
            bio,
            live,
        };
    }
}

module.exports = User;
