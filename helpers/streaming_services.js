const SERVICE_YOUTUBE = 'youtube';
const SERVICE_TWITCH = 'twitch';

const AVAILABLE_SERVICES = [
    SERVICE_TWITCH,
];

async function getStreamingService(name, getDep) {
    if (AVAILABLE_SERVICES.indexOf(name) === -1) {
        return null;
    }
    return await getDep(name);
}

module.exports = {
    SERVICE_YOUTUBE,
    SERVICE_TWITCH,
    AVAILABLE_SERVICES,
    getStreamingService,
};
