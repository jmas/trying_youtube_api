const Repo = require('../classes/repo');
const Tag = require('../models/tag');

module.exports = class Tags extends Repo {
    constructor(db) {
        super(db, {
            collectionName: 'tags',
            Model: Tag,
        });
    }
}
