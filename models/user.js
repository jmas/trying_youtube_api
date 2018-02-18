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
}

module.exports = User;
