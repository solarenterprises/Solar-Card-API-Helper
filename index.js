// module.exports = {
//     /* Business2dApi: require('./libIntergiro/Business2dApi'), */
//     Baas3dApi: require('./libIntergiro/Baas3dApi')
//         /*cardAcquiringApi: require('./libIntergiro/cardAcquiringApi')*/
// }

const CustodyApi = require('./libnowcustody/CustodyApi');

async function testAvailableCurrencies() {
    var api = new CustodyApi();
    var result = await api.GetListAvailableCurrencies({flow: 'standard'});
    console.log(result);
}

async function testMinimaldepositAmount() {
    var api = new CustodyApi();
    var result = await api.GetEstimatedDepositAmount({fromCurrency: 'btc', toCurrency: 'usdt'});
    console.log(result);
}
async function testEstimatedDepositAmount() {
    var api = new CustodyApi();
    var result = await api.GetEstimatedDepositAmount({fromCurrency: 'btc', toCurrency: 'usdt', fromAmount:'0.1', fromNetwork: 'btc', toNetwork: 'eth', flow:'fixed-rate'});
    console.log(result);
}
async function testCheckDepositStatus() {
    var api = new CustodyApi();
    var result = await api.GetCheckDepositStatus({id: '5677b0657a1795'});
    console.log(result);
}

// testAvailableCurrencies();
// testMinimaldepositAmount();
// testEstimatedDepositAmount();
testCheckDepositStatus();