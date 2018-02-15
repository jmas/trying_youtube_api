class Repo {
    constructor(db, collectionName) {
        this._db = db;
        this._collection = this._db.collection(collectionName);
    }

    async add(value) {
        return await this._db.collection(this._collectionName).insert(value);
    }

    async find(query) {

    }

    async update(query, value) {

    }

    async remove(query) {

    }
}

module.exports = Repo;
