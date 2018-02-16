class Repo {
    constructor(db, collectionName, Model) {
        this._db = db;
        this._collection = this._db.collection(collectionName);
        this._Model = Model;
    }

    async findOne(query={}) {
        const raw = await this._collection.findOne(query);
        const Model = this._Model;
        return new Model(raw);
    }

    async find(query={}) {
        const Model = this._Model;
        return (await this._collection.find(query).toArray()).map(raw => new Model(raw));
    }

    async save(model) {
        const modelId = model.getId();
        const Model = this._Model;
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
