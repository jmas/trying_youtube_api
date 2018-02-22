const getDep = require('../get_dep');
const fetch = require('node-fetch-polyfill');

module.exports = async (args, logger) => {
    const tags = await getDep('tags');
    const Tag = (await getDep('models')).get('tag');
    let page = 1;
    let saveCount = 0;
    let failCount = 0;
    let quotaRemaining = 0;
    let items = [];
    do {
        const response = await fetch(`https://api.stackexchange.com/2.2/tags?page=${page}&pagesize=100&order=desc&sort=popular&site=stackoverflow`);
        const data = await response.json();
        items = data.items || [];
        quotaRemaining = data.quota_remaining || 0;
        for (let i=0; i<items.length; i++) {
            const { name, count } = items[i];
            const tag = new Tag({ name, count });
            if (await tags.save(tag)) {
                saveCount++;
            } else {
                failCount++;
            }
        }
        page++;
    } while (quotaRemaining > 0 && items.length > 0);
    return {
        itemsCount: saveCount + failCount,
        saveCount,
        failCount,
    };
};
