const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Booking = require('../models/Booking')

const api = supertest(app);
let token;

beforeEach(async () => {
    const response = await api
        .post('/userLogin')
        .send({ username: "akashsharma.zak@gmail.com", password: "Akash" })
        .expect(200)
        .expect('Content-Type', /application\/json/)

    token = `Bearer ${response.body.token}`;
})

test('Book a vehicle', async () => {
    const obj = { till_date: "Mon Jul 24 2023 17:36:39 GMT+0530 (India Standard Time)", model: "T100X", email: "akashsharma.zak@gmail.com" };
    await api
        .post('/bManage/book_now')
        .send(obj)
        .set('Authorization', token)
        .expect(201)

    const booking = await Booking.findOne({model: obj.model, email: obj.email});
    expect(booking.email).toBe(obj.email);
})

afterAll(async () => {
    await mongoose.connection.close()
})