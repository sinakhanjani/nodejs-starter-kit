const message = require('../../helper/message.helper')

class Response {  
    res = {
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

    add(data) {
        this.res.data = data 
        this.res.status = true
        this.res.message = 'success'
        this.res.records = undefined

        return this.res
    }

    notFound() {
        this.res.data = undefined
        this.res.status = false
        this.res.message = 'not found'
        this.res.records = undefined

        return this.res
    }

    success() {
        this.res.data = undefined
        this.res.status = true
        this.res.message = 'success'
        this.res.records = undefined

        return this.res
    }

    unSuccess(message) {
        this.res.data = undefined
        this.res.status = false
        this.res.message = message
        this.res.records = undefined

        return this.res
    }

    unknown() {
        this.res.data = undefined
        this.res.status = false
        this.res.message = message.unknown.res
        this.res.records = undefined

        return this.res
    }
}

module.exports = Response
