const getDep = require('../get_dep');
const mongoSchemas = require('../data/collections_schemas');

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

    for (let i=0; i<mongoSchemas.length; i++) {
        const { collectionName, options } = mongoSchemas[i];
        try {
            const result = await createOrModifyCollection(collectionName, options);
            console.log('[ok]', collectionName, result);
            process.exit(0);
        } catch (error) {
            console.log('[error]', collectionName, error);
            process.exit(1);
        }
    }

})();
