function initServices(servicesConfig, load) {
    return Object.keys(servicesConfig)
        .reduce(async (services, name) => {
            const { create } = load(name);
            try {
                services[name] = await create(servicesConfig[name]);
                return services;
            } catch (error) {
                console.error(error);
                process.exit(1);
            }
        }, {});
}

module.exports = {
    initServices,
};
