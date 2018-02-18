class Model {
    constructor(raw={}) {
        this._raw = raw;
    }

    getId() {
        return this._raw._id;
    }

    get(key, defaultValue=null) {
        return key in this._raw ? this._raw[key]: defaultValue;
    }

    getRaw() {
        return this._raw;
    }
}

module.exports = Model;
