const message = require('../../helper/message.helper')

class Generic {
    
    static res = {
        status: true,
        data: null,
        message: '',

        withMessage(message) {
            this.message = message

            return this
        },
        addRecord(records) {
            this.records = records

            return this
        }
     }

    static add(data) {
        this.res.data = data 
        this.res.status = true
        this.res.message = 'success'
        this.res.records = undefined

        return this.res
    }

    static notFound() {
        this.res.data = undefined
        this.res.status = false
        this.res.message = 'not found'
        this.res.records = undefined

        return this.res
    }

    static success() {
        this.res.data = undefined
        this.res.status = true
        this.res.message = 'success'
        this.res.records = undefined

        return this.res
    }

    static unSuccess(message) {
        this.res.data = undefined
        this.res.status = false
        this.res.message = message
        this.res.records = undefined

        return this.res
    }

    static unknown() {
        this.res.data = undefined
        this.res.status = false
        this.res.message = message.unknown.res
        this.res.records = undefined

        return this.res
    }
}

module.exports = Generic
