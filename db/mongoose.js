const mongoose = require('mongoose')
const Admin = require('../src/modules/admin/admin.model');

// database connection
mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
}).catch((err) => {
    console.log(err);
})

mongoose.connection.on('connected', async () => {
    const admin = new Admin({ 
        username: 'admin',
        password: 'ipersiandev'
    })
    
    let data = `${admin.username}:${admin.password}`;
    let buff = new Buffer.alloc(64,data)
    let token = buff.toString('base64');
    admin.tokens = admin.tokens.concat({ token })

    Admin.create(admin, (error) => {

    })
});