const getDep = require('../get_dep');

/**
 * Apply schema to MongoDB.
 * @param {Object} args -script arguments
 * @param {String} args.schemaName - schema name
 * @param {Object} logger - logger
 */
module.exports = async (args, logger) => {
    const schemaName = args.schemaName;
    if (!schemaName) {
        throw `Please provide schema name as first argument.`;
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

/**
 * Create collection or update it options.
 * @param {MongoClient} db - mongo client
 * @param {String} collectionName - collection name
 * @param {Object} options - collection options
 */
async function createOrUpdateCollectionOptions(db, collectionName, options={}) {
    const collectionInfo = await (await db.listCollections({
        name: collectionName,
    })).toArray();
    if (collectionInfo.length > 0) {
        return await db.command({
            collMod: collectionName,
            ...options,
        });
    }
    return await db.createCollection(collectionName, options);
}
