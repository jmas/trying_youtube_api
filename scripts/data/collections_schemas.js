module.exports = [
    {
        collectionName: 'users',
        options: {
            validator: {
                $jsonSchema: require('../../schemas/users.json'),
            }
        }
    }
];
