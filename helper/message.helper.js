const message = {
    added: {
        res: 'record is successfully added to mongodb',
        code: 201
    },
    removed: {
        res: 'record removed successfuly in mongodb',
        code: 1001
    },
    notRemoved: {
        res: 'record || records cant be removed in mongodb',
        code: 812
    },
    notFound: {
        res: 'record || records not found in mongodb',
        code: 809
    },
    unknown: {
        res: 'something went wrong!',
        code: 404
    },
    duplicated: {
        res: 'dup found in mongodb',
        code: 811
    },
    success: {
        res: 'success',
        code: 200
    },
    authenticate: {
        res: 'user not authenticate with token',
        code: 1009
    },
    badUpdate: {
        res: 'Invalid input for updates!',
        code: 1011
    },
    badPassword: {
        res: 'Password cannot contain "password"',
        code: 1012
    },
    unsend: {
        res: 'some key are requirement not send to server',
        code: 1013
    },
    adminAuthErr: {
        res: 'admin not authenticate with token',
        code: 1014
    },
    register: {
        res: 'verification code send to user',
        code: 810
    },
    entered: {
        res: 'user entered successfuly with phone authentication',
        code: 1018
    },
    expiredCode: {
        res: 'authentication code was expired in 60 secends or incorrect code',
        code: 1017
    },
    badCode: {
        res: 'invalid input your code or phone number',
        code: 811
    },
    phoneCondition: {
        res: 'phone number must be 11 characters',
        code: 1015
    },
    badInput: {
        res: 'phone number must be 11 characters',
        code: 1016
    },
    successPayment: {
        res: 'your payment is success and record to mongodb',
        code: 812
    },
    uncorrect: {
        res: 'invalid input (validation) format',
        code: 812
    },
}

module.exports = message
