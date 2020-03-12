// Test user related functions
const request = require('supertest');
const app = require('../src/app');
const User = require('../src/models/user');

// Each test case will focus on testing a specific endpoint, 
// making assertions (expect) about the response from the server.

const userOne = {
    name: 'Mike',
    email: 'mike@friends.com',
    password: 'ilovephoebe'
};

// Run before EACH test case
beforeEach(async () => {
    await User.deleteMany();
    await new User(userOne).save();
});

afterEach(() => {
    console.log('afterEach');
});

test('Should sign up a new user', async () => {
    await request(app).post('/users').send({
        name: 'Elsa',
        email: 'elsa@queen.com',
        password: 'letitgo'
    }).expect(201);
});

test('Shoule login existing user', async () => {
    await request(app).post('/users/login').send({
        email: userOne.email,
        password: userOne.password
    }).expect(200);
});

test('Should not login non-existing user', async () => {
    await request(app).post('/users/login').send({
        email: userOne.name,
        password: userOne.email
    }).expect(400);
});