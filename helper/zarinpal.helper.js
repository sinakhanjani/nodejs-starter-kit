const Zarinpal = require('zarinpal-checkout');
const config = require('config')

/**
 * Initial ZarinPal module.
 * @param {String} 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx' [MerchantID]
 * @param {boolean} false [toggle `Sandbox` mode]
 */

module.exports = Zarinpal.create(config.get('Customer.zarinpal.key'), config.get('Customer.zarinpal.sandbox'));
