const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Vehicle = require('../models/Vehicle')
const Customer = require('../models/Customer')

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
    const oList = await Vehicle.find({});
    const obj = { model: "T100X", make: "TATA", year: 2022, fuel_type: "Electric", seating_capacity: 4 };
    await api
        .post('/vManage/add')
        .send(obj)
        .set('Authorization', token)
        .expect(201)

    // const vehicle = await Vehicle.findOne({model: obj.model});
    // expect(vehicle.model).toBe(obj.model);
    const nList = await Vehicle.find({});
    const models = nList.map(n => n.model);
    expect(nList).toHaveLength(oList.length + 1);
    expect(models).toContain(obj.model);
})

test('Add a customer', async () => {
    const obj = { name: "Akash", email: "akashsharma.zak@gmail.com", contact_number: 9625635455, password: "Akash" };
    await api
        .post('/cManage/add')
        .send(obj)
        .set('Authorization', token)
        .expect(201)

    const customer = await Customer.findOne({email: obj.email});
    expect(customer.email).toBe(obj.email);
})

afterAll(async () => {
    await mongoose.connection.close()
})