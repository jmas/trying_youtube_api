const getDep = require('../get_dep');

/**
 * Create collection or update it options.
 * @param {MongoClient} db - mongo client
 * @param {String} collectionName - collection name
 * @param {Object} options - collection options
 */
async function createOrUpdateCollectionOptions(db, collectionName, options={}) {
    const collectionInfo = await db.listCollections({
        name: collectionName,
    });
    if (collectionInfo) {
        return await db.command({
            collMod: collectionName,
            ...options,
        });
    }
    return await db.createCollection(collectionName, schema);
}

/**
 * Apply schema to MongoDB.
 * @param {Object} args -script arguments
 * @param {String} args.schemaName - schema name
 */
module.exports = async args => {
    const schemaName = args.schemaName;
    if (!schemaName) {
        throw `Please pass schema name as first argument.`;
    }
    const schema = require(`../schemas/${schemaName}.json`);
    const collectionName = schemaName;
    
    const db = await getDep('db');

    return await createOrUpdateCollectionOptions(db, collectionName, {
        validator: {
            $jsonSchema: schema,
        },
    });
};
