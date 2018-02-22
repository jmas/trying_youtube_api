const Repo = require('../classes/repo');
const User = require('../models/user');

module.exports = class Users extends Repo {
    constructor(db) {
        super(db, {
            collectionName: 'users',
            Model: User,
        });
    }
}
