class Repo {
    constructor(db, options={}) {
        this._db = db;
        this._options = options;
        this._collection = this._db.collection(this._options.collectionName);
    }

    async findOne(query={}) {
        const raw = await this._collection.findOne(query);
        const { Model } = this._options;
        if (!raw) {
            return null;
        }
        return new Model(raw);
    }

    async find(query={}) {
        const { Model } = this._options;
        return (await this._collection.find(query).toArray()).map(raw => new Model(raw));
    }

    async save(model) {
        const { Model } = this._options;
        const modelId = model.getId();
        if (modelId) {
            const { result } = await this._collection.updateOne({ _id: modelId }, { $set: model.getRaw() });
            return result.ok > 0 ? model: null;
        }
        const { result, ops } = await this._collection.insertOne(model.getRaw());
        return result.ok > 0 ? new Model(ops[0]): null;
    }

    async remove(model) {
        return await this._collection.remove({ _id: model.getId() }, true);
    }
}

module.exports = Repo;
