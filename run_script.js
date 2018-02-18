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
        logger.info('run', script);
        const result = await runScript(args, loggerScript);
        logger.info('result', script, result);
        process.exit(0);
    } catch (error) {
        logger.error('error', script, error);
        process.exit(1);
    }
})();
