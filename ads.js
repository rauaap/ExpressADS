const ads = require('ads-client');
const config = require('./config');

const client = new ads.Client({
    targetAmsNetId: config.targetAmsNetId,
    targetAdsPort: 851
});

client.connect().catch(e => {
    console.error(e);
    process.exit(1);
});

module.exports = {
    client
};