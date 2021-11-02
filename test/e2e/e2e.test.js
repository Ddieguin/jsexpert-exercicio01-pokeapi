const request  = require("supertest");
const { server } = require("../../src/api");



describe("End2End", () => {

    test('testing route "/team"', async () => {
       await request(server)
        .get('/team')
        .expect('Content-Type', 'application/json')
        .expect(200)
    }) 

    test('testing route "/"', async () => {
        await request(server)
        .get('/')
        .expect('Content-Type', 'application/json')
        .expect(200)
    })

    test('testing a non-existent route', async () => {
        await request(server)
        .get('/hi')
        .expect('Content-Type', 'application/json')
        .expect(200)
    })

    test('testing a non-existent method', async () => {
        await request(server)
        .post('/team')
        .expect(404)
    })
})