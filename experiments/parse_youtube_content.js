const fetch = require('node-fetch-polyfill');
const url = 'https://www.youtube.com/user/OfficialPeppaRussia/videos';

console.log('run');

const pattern = /window\["ytInitialData"\] = \{(.+?)\};/m;

function parseJsonSafely(jsonString, defaultValue=null) {
    try {
        return JSON.parse(jsonString);
    } catch(error) {}
    return defaultValue;
}

fetch(url, {
    headers: {
        'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.140 Safari/537.36'
    }
})
    .then(response => response.text())
    .then(content => {
        const [, jsonString] = content.match(pattern);
        console.log( parseJsonSafely(`{${jsonString || ''}}`) );
    });
