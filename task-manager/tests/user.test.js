const request = require('supertest');
const app = require('../src/app');
const User = require('../src/models/user');
const {userOneID, userOne, setupDatabase} = require('./fixtures/db');

/*
   Each test case will focus on testing a specific endpoint, 
   making assertions (expect) about the response from the server.
*/

// Run before EACH test case
beforeEach(setupDatabase);

// afterEach(() => {
//     console.log('afterEach');
// });

test('Should sign up a new user', async () => {
    const response = await request(app).post('/users').send({
        name: 'Elsa',
        email: 'elsa@queen.com',
        password: 'letitgo'
    }).expect(201);

    // Assert the database was changed correctly
    const user = await User.findById(response.body.user._id);
    expect(user).not.toBeNull();

    // Assertions about the response
    expect(response.body).toMatchObject({
        user: {
            name: 'Elsa',
            email: 'elsa@queen.com'
        },
        token: user.tokens[0].token
    });
    expect(user.password).not.toBe('MyPass777!');
});

test('Shoule login existing user', async () => {
    const response = await request(app).post('/users/login').send({
        email: userOne.email,
        password: userOne.password
    }).expect(200);

    // Assert the user exists in the database
    const user = await User.findById({_id: response.body.user._id});
    expect(user).not.toBeNull();
    // Assert the token is matched
    expect(response.body.token).toBe(user.tokens[1].token);
});

test('Should not login non-existing user', async () => {
    await request(app).post('/users/login').send({
        email: userOne.name,
        password: userOne.email
    }).expect(400);
});

test('Should get profile for user', async() => {
    await request(app)
        .get('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`) // Set header
        .send()
        .expect(200);
});

test('Should not get profile for unauthenticated user', async () => {
    await request(app)
        .get('/users/me')
        .send()
        .expect(401);
});

test('Should delete the user account', async() => {
    await request(app)
        .delete('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200);

    const user = await User.findById(userOneID);
    expect(user).toBeNull();
});

test('Should not delete the user account without authentication', async () => {
    await request(app)
        .delete('/users/me')
        .send()
        .expect(401);
});

test('Should upload avatar image', async () => {
    await request(app)
        .post('/users/me/avatar')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .attach('avatar', 'tests/fixtures/profile-pic.jpg')
        .expect(200);
    const user = await User.findById(userOneID);
    expect(user.avatar).toEqual(expect.any(Buffer));
});

test('Should update valid user fields', async () => {
    const response = await request(app)
        .patch('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            name: 'Michael'
        })
        .expect(200);
    const user = await User.findById(userOneID);
    expect(user.name).toBe('Michael');
});

test('Should not update invalid user fields', async () => {
    const response = await request(app)
        .patch('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            location: 'Taipei'
        })
        .expect(400);
});

//
// User Test Ideas
//
// Should not signup user with invalid name/email/password
// Should not update user if unauthenticated
// Should not update user with invalid name/email/password
// Should not delete user if unauthenticated

test('Should not signup user with invalid name', async () => {
    await request(app)
        .post('/users')
        .send({
            email: 'ggg@test.com',
            password: 'should pass'
        })
        .expect(400);
});

test('Should not signup user with invalid email', async () => {
    await request(app)
        .post('/users')
        .send({
            name: 'Santa',
            email: 'test.com',
            password: 'should pass'
        })
        .expect(400);
});

test('Should not signup user with invalid password', async () => {
    await request(app)
        .post('/users')
        .send({
            name: 'Santa',
            email: 'test.com',
            password: 'mypassword'
        })
        .expect(400);
});

test('Should not update user if unauthenticated', async () => {
    await request(app)
        .patch('/users/me')
        .send({
            name: 'Shawn'
        })
        .expect(401);
});

test('Should not update user with invalid name', async () => {
    await request(app)
        .patch('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            name: null
        })
        .expect(400);
});

test('Should not update user with invalid email', async () => {
    await request(app)
        .patch('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            email: 'test.com',
        })
        .expect(400);
});

test('Should not update user with invalid password', async () => {
    await request(app)
        .patch('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            password: 'mypassword'
        })
        .expect(400);
});

test('Should not delete user if unauthenticated', async () => {
    await request(app)
        .delete('/users/me')
        .send()
        .expect(401);
});