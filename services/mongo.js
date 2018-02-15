const { MongoClient } = require('mongodb');

async function create({
    url,
}) {
    const mongoClient = await MongoClient.connect(url);

    return {

    };
}

module.exports = {
    create,
};
