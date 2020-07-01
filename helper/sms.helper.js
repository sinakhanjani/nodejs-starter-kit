const config = require('config')
const Moment = require('moment')
const axios = require('axios')

class SendMessageService {

    constructor() {
        // sms.ir
        this.secretKey = config.get('Customer.sms.secretKey')
        this.userApiKey = config.get('Customer.sms.userApiKey')
        this.templateId = config.get('Customer.sms.tempId.code.id')
        this.getTokenURL = config.get('Customer.sms.urls.getTokenURL')
        this.sendCodeURL = config.get('Customer.sms.urls.sendCodeURL')
        this.getCreditURL = config.get('Customer.sms.urls.getCreditURL')
        this.getSendURL = config.get('Customer.sms.urls.getSendURL')
        this.sendingNumber = config.get('Customer.sms.sendingNumber')
        
        this.token = ''
        this.expTokenDate = 0
        this.tokenExpRemaining = 29 * 60000
    }

    async getToken() {
        const now = new Date()

        if (((now - this.expTokenDate) < this.tokenExpRemaining) && this.token) {
          return this.token
        }
    
        const res = await axios.post(this.getTokenURL, {
          UserApiKey: this.userApiKey,
          SecretKey: this.secretKey,
        });
    
        if (!res.data.IsSuccessful) { 
            throw new Error(res.data.Message)
        }
    
        this.token = res.data.TokenKey
        this.expTokenDate = new Date()
    }  

    async sendCode(phone, code) {
        await this.getToken()
      
        const res = await axios.post(this.sendCodeURL, {
          Mobile: phone,
          TemplateId: this.templateId,
          ParameterArray: [
            {
              Parameter: config.get('Customer.sms.tempId.code.parameter'),
              ParameterValue: code,
            },
          ],
        }, {
          headers: { 'x-sms-ir-secure-token': this.token },
        });
    
        if (!res.data.IsSuccessful) {          
            throw new Error(res.data.Message);
        }
    }

    async getCredit() {
        await this.getToken();
    
        const res = await axios.get(this.getCreditURL, {
          headers: { 'x-sms-ir-secure-token': this.token },
        })
    
        if (!res.data.IsSuccessful) {
          throw new Error(res.data.Message)
        }
        return res.data.Credit
    }
    
    async sendMessage(message, phones) {
        if (!Array.isArray(phones)) throw new Error('phones must be sent as an array');
        if (typeof message !== 'string') throw new Error('message must be an array');
    
        await this.getToken();
    
        const res = await axios.post(this.getSendURL, {
          Messages: [message],
          MobileNumbers: phones,
          LineNumber: this.sendingNumber,
          SendDateTime: new Moment().format(),
          CanContinueInCaseOfError: 'true',
        }, {
          headers: { 'x-sms-ir-secure-token': this.token },
        });
    
        if (!res.data.IsSuccessful) {
          throw new Error(res.data.Message);
        }
    }
}

module.exports = new SendMessageService()