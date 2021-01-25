const assert = require('assert');
const request = require('supertest');
const app = require('../index');

describe('api endpoints', () => {
    it('handles GET request /api/v1/pokemon-advantage/ditto/pikachu', done => {
        request(app)
            .get('/api/v1/pokemon-advantage/ditto/pikachu')
            .end((err, response) => {
                assert(response.status === 200);
                assert(response.body.double_damage_to === false);
                assert(response.body.half_damage_from === false);
                done();
            });
    });
    it('handles GET request /api/v1/pokemon-advantage/', done => {
        request(app)
            .get('/api/v1/pokemon-advantage/')
            .end((err, response) => {
                assert(response.status === 404);
                done();
            });
    });
    it('handles GET request /api/v1/pokemon-advantage/ditto/', done => {
        request(app)
            .get('/api/v1/pokemon-advantage/ditto/')
            .end((err, response) => {
                assert(response.status === 404);
                done();
            });
    });
    it('handles GET request /api/v1/pokemon-advantage/charizard/bulbasaur', done => {
        request(app)
            .get('/api/v1/pokemon-advantage/charizard/bulbasaur')
            .end((err, response) => {
                assert(response.status === 200);
                assert(response.body.double_damage_to === true);
                assert(response.body.half_damage_from === true);
                done();
            });
    });
});