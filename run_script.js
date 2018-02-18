const getDep = require('./get_dep');

(async () => {
    const loggerDep = await getDep('logger');
    const args = process.argv.reduce((args, arg) => {
        if (arg.indexOf('=') !== -1) {
            const [key, value] = arg.split('=');
            return {
                ...args,
                [key]: value,
            };
        }
        return args;
    }, {});
    const logger = loggerDep.withNamespace('run_script');
    logger.log('args', args);
    const { script } = args;
    const runScript = require(`./scripts/${script}.js`);
    const loggerScript = loggerDep.withNamespace(script);
    try {
        const result = await runScript(args, loggerScript);
        logger.info('result', result);
        process.exit(0);
    } catch (error) {
        logger.error('error', error);
        process.exit(1);
    }
})();
