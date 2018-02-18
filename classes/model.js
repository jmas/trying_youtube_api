class Model {
    constructor(raw={}) {
        this._raw = raw;
    }

    getId() {
        return this._raw._id;
    }

    get(key) {
        return this._raw[key];
    }

    getRaw() {
        return this._raw;
    }
}

module.exports = Model;
