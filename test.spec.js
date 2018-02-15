const { assert } = require('chai');
const getDep = require('./get_dep');

const User = require('./models/user');

describe('Users', async () => {

    it('save new', async () => {
        const users = await getDep('users');
        const newUser = new User({
            name: 'Alex',
        });
        const savedUser = await users.save(newUser);
        assert.isOk(savedUser.getId(), 'do not have an ID');
    });

    it('find all', async () => {
        const users = await getDep('users');
        const models = await users.find({ name: 'Alex' });
        assert.isOk(models.length > 0, 'do not find any record');
    });
});
