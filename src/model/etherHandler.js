const ethers =  require("ethers");
const errorCodes = require('../constant/errorCodes')

const testNetAPIKey = "c73b6bd1d01d4152a57d6c3d686ee9ff"
const provider = new ethers.providers.InfuraProvider("rinkeby", testNetAPIKey)


module.exports = {
    createWallet: async () => {
        return await new ethers.Wallet.createRandom()
    },
}
