class Utils {

    static host = (req) => {
        const address = req.protocol + '://' + req.get('host');

        return address
    }

    static generateAuthCode = () => {
        let authCode = 1;
        while (authCode < 1000) {
          authCode = Math.floor(Math.random() * 10000);
        }
        return authCode;
    }
}

module.exports = Utils