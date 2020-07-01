
const axios = require('axios');
const config = require('config')

const firebase = async (fcmToken) => {
    try {
      const response = await axios.post(notifConfig.url, {
        // body
      }, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: config.get('Customer.firebase.serverKey'),
        },
      });
      // response ...
    } catch (err) {
      throw new Error(err);
    }
};