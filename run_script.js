(async () => {
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
    console.log('[script] args', args);
    const runScript = require(`./scripts/${args.script}.js`);
    try {
        const result = await runScript(args);
        console.log('[script] result', result);
        process.exit(0);
    } catch (error) {
        console.log('[script] error', error);
        process.exit(1);
    }
})();
