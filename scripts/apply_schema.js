const getDep = require('../get_dep');

const schemaName = process.argv[2];
if (!schemaName) {
    throw `Please pass schema name as first argument.`;
}
const schema = require(`../schemas/${schemaName}.json`);
const collectionName = schemaName;

(async () => {
    
    const db = await getDep('db');

    async function createOrModifyCollection(collectionName, options) {
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

    try {
        const result = await createOrModifyCollection(collectionName, {
            validator: {
                $jsonSchema: schema,
            },
        });
        console.log('[ok]', collectionName, result);
        process.exit(0);
    } catch (error) {
        console.log('[error]', collectionName, error);
        process.exit(1);
    }

})();
