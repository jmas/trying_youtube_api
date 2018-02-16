const Repo = require('../classes/repo');
const User = require('../models/user');

class Users extends Repo {
    constructor(db) {
        super(db, 'users', User);
    }
}

module.exports = Users;
