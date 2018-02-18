const getDep = require('../get_dep');

async function createOrModifyCollection(db, collectionName, options) {
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

module.exports = async args => {
    const schemaName = args.schemaName;
    if (!schemaName) {
        throw `Please pass schema name as first argument.`;
    }
    const schema = require(`../schemas/${schemaName}.json`);
    const collectionName = schemaName;
    
    const db = await getDep('db');

    return await createOrModifyCollection(db, collectionName, {
        validator: {
            $jsonSchema: schema,
        },
    });
};
