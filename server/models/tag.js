const Model = require('../classes/model');

module.exports = class Tag extends Model {
    constructor(raw) {
        super({
            name:   '',
            count:  0,
            ...raw,
        });
    }
}
