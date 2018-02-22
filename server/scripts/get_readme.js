const URL = require('url');
const fetch = require('node-fetch-polyfill');

const readmeFiles = ['README.md', 'readme.md'];

function getGithubFileUrl(owner, repo, filePath) {
    return `https://api.github.com/repos/${ owner }/${ repo }/contents/${ filePath }`;
}

module.exports = async (args, logger) => {
    const { path } = args;
    
    if (!path) {
        return null;
    }

    const { pathname } = URL.parse(path);
    const [ owner, repo ] = pathname.replace(/(^\/|\/$)/, '').split('/');

    for (let i=0; i<readmeFiles.length; i++) {
        const url = getGithubFileUrl(owner, repo, readmeFiles[i]);
        const response = await fetch(url);
        if (response.ok) {
            const { content } = await response.json();
            return new Buffer(content, 'base64').toString('ascii');
        }
    }

    return null;
};
