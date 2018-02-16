class Model {
    constructor(raw) {
        this._raw = raw;
    }

    getId() {
        return this._raw._id;
    }

    getRaw() {
        return this._raw;
    }
}

module.exports = Model;
