
module.exports = deps => {
    const instances = {};
    const get = async name => {
        if (!instances[name]) {
            instances[name] = await deps[name](get);
        }
        return instances[name];
    };
    return get;
};
