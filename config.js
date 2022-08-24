require('dotenv').config()

const targetAmsNetId = process.env.TARGET_AMS_NET_ID
const expressPort = process.env.EXPRESS_PORT

module.exports = {
    targetAmsNetId,
    expressPort
}