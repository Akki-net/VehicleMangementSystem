const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Vehicle = require('../models/Vehicle')

const api = supertest(app);
let token;

beforeEach(async () => {
    const response = await api
        .post('/adminLogin')
        .send({ username: "admin", password: "root" })
        .expect(200)
        .expect('Content-Type', /application\/json/)

    token = `Bearer ${response.body.token}`;
})

test('Add vehicle details and check', async () => {
    const obj = { model: "XS100", make: "Tesla", year: 2013, fuel_type: "Electric", seating_capacity: 4 };
    await api
        .post('/vManage/add')
        .send(obj)
        .set('Authorization', token)
        .expect(201)

    const vehicle = await Vehicle.findOne({model: obj.model});
    console.log("vehi", vehicle)
    expect(vehicle.model).toBe(obj.model);
})



afterAll(async () => {
    await mongoose.connection.close()
})