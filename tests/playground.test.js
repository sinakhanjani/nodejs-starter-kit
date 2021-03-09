const request = require('supertest')
const app = require('../src/app-test')
const moongoose = require('mongoose')
const User = require('../src/modules/user/user.model')
const userIdObject = new moongoose.Types.ObjectId()
var fs = require('fs');

// Befor each tests
beforeEach(() => {
    // await User.deleteMany()
    // await new User({ user: 'sina' }).save()
    console.log('beforEach');
})

// After each tests
// afterEach(() => {
//     console.log('afterEach');
// })

test('Sample Test Success 1', () => {
    //
})

// test('Sample Test Success 2', () => {
//     expect(9).toBe(9)
// })

/// ====== Throw Fallback =======
// test('Sample Test Failed 1', (done) => {
//     throw new Error('Something went wrong!')
// })

/// ====== Asyc Test - done() ======
// test('Sample Test Failed 2',(done) => {
//     setTimeout(() => {
//         expect(1).toBe(1)
//     }, 2000)
// })
test('Sample Test Success 2-1',(done) => {
    setTimeout(() => {
        expect(1).toBe(1)
        done()
    }, 2000)
})
// test('Sample Test Success 2-2', async () => {
//     setTimeout(() => {
//         expect(1).toBe(1)
//         done()
//     }, 2000)
// })

// test('request test', async () => {
//     await request(app).post('/users').send({
//         name: 'sina',
//         age: 14
//     }).expect(201)
// })

test('request LIST-ALL-User-GET', async () => {
    await request(app)
    .get('/api/user?index=0&count=6')
    .set('Authorization','Basic YWRtaW46aXBlcnNpYW5kZXY=')
    .expect(200)
})

test('request ADD-NEW-UNIQUE-User-POST', async () => {
    const response = await request(app)
    .post('/api/user/add')
    .send({
        name: 'na25ccfSG42o1s',
        phone: '09159876154',
        image: fs.createReadStream('/Users/sinakhanjani/Pictures/Me.jpg')
    })
    .set('Authorization','Basic YWRtaW46aXBlcnNpYW5kZXY=')
    .expect(200)

    //1. Assert that data base change correctly
    const user = await User.findById(response.body.data.user._id)
    expect(user).not.toBeNull()

    //2. Assert to response body
    expect(response.body).toMatchObject(
        {
            status: true,
            data: {
              user: {
                name: user.name,
                age: 18,
                _id: user.id,
                phone: user.phone,
                imagesURL: []
              },
              token: user.tokens[0].token
            },
            message: 'record is successfully added to mongodb'
          }
    )

    //3. Assert name
    expect(user.name).toBe('na25ccfSG42o1s')
})

// Test send and recieved data 
// test('Should upload avatar image', async () => {
//     await request(app)
//         .post('/users/me/avatar')
//         .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
//         .attach('avatar', 'tests/fixtures/profile-pic.jpg')
//         .expect(200)
//     const user = await User.findById(userOneId)
//     expect(user.avatar).toEqual(expect.any(Buffer))
// })