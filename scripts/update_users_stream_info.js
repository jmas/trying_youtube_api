const getDep = require('../get_dep');
const User = require('../models/user');
const { getValidationErrors } = require('../helpers/validate');
const userSchema = require('../schemas/users.json');

/**
 * 1. Get list of 100 users from DB that have 'streamInfoUpdateDate' out of date
 * 2. Go to Twitch API to actualize information about users streams
 * 3. Update users 'streamInfo' into DB
 * @param {Object} args - script arguments
 */
module.exports = async args => {
    const users = await getDep('users');
    const twitch = await getDep('twitch');
    const foundUsers = await users.find({
        $or: [
            {
                streamInfoUpdateDate: {
                    $exists: false,
                },
            },
            {
                streamInfoUpdateDate: {
                    $exists: true,
                    $lt: new Date((new Date()).getTime() - 60 * 1000),
                },
            },
        ],
    }, { limit: 100 });

    const channelIdsCommaSeparated = foundUsers.reduce((channelIds, user) => {
        return [ ...channelIds, user.get('name') ];  
    }, []).join(',');
    const streams = await twitch.getStreams({
        channel: channelIdsCommaSeparated,
    });

    const streamInfoUpdateDate = new Date();

    const patchedUsers = foundUsers.map(user => {
        const userName = user.get('name');
        const streamInfo = streams.find(stream => userName === stream.channel.name);
        const streamLive = !!streamInfo;
        return new User({
            ...user.getRaw(),
            streamInfo: streamInfo || {},
            streamInfoUpdateDate,
            live: streamLive,
        });
    });

    let successCount = 0;
    let failCount = 0;

    for (let i=0; i<patchedUsers.length; i++) {
        const patchedUser = patchedUsers[i];
        console.log('[update_users_stream_info] patchedUser', patchedUser);
        const errors = getValidationErrors(patchedUser.getRaw(), userSchema);
        if (errors.length > 0) {
            console.log('[update_users_stream_info] errors', errors);
            continue;
        }
        if (await users.save(patchedUser)) {
            console.log('[update_users_stream_info] ok');
            successCount++;
        } else {
            console.log('[update_users_stream_info] fail');
            failCount++;
        }
    }

    return {
        successCount,
        failCount,
    };
};
