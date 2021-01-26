const assert = require('assert');
const request = require('supertest');
const app = require('../index');

describe('api endpoints', () => {
    it('handles GET request /api/v1/pokemon-moves/en/charizard&pikachu/10', done => {
        request(app)
            .get('/api/v1/pokemon-moves/en/charizard&pikachu/10')
            .end((err, response) => {
                assert(response.status === 200);
                assert(response.body.common_moves.length === 10);
                done();
            });
    });
    it('handles GET request /api/v1/pokemon-moves/en/charizard&pikachu/999', done => {
        request(app)
            .get('/api/v1/pokemon-moves/en/charizard&pikachu/999')
            .end((err, response) => {
                assert(response.status === 200);
                assert(response.body.common_moves.length === 48);
                assert(response.body.common_moves.includes('Swift'));
                done();
            });
    });
    it('handles GET request /api/v1/pokemon-moves//charizard&pikachu/10', done => {
        request(app)
            .get('/api/v1/pokemon-moves//charizard&pikachu/10')
            .end((err, response) => {
                assert(response.status === 404);
                done();
            });
    });
    it('handles GET request /api/v1/pokemon-moves/en/charizard&/999', done => {
        request(app)
            .get('/api/v1/pokemon-moves/en/charizard&/999')
            .end((err, response) => {
                assert(response.status === 404);
                assert(response.text === 'Invalid API use, see documentation for help');
                done();
            });
    });
    it('handles GET request /api/v1/pokemon-moves/en/charizard/10', done => {
        request(app)
            .get('/api/v1/pokemon-moves/en/charizard/10')
            .end((err, response) => {
                assert(response.status === 404);
                assert(response.text === 'Invalid API use, see documentation for help');
                done();
            });
    });
    it('handles GET request /api/v1/pokemon-moves/en/charizard&ditto/', done => {
        request(app)
            .get('/api/v1/pokemon-moves/en/charizard&ditto/')
            .end((err, response) => {
                assert(response.status === 404);
                done();
            });
    });
    it('handles GET request /api/v1/pokemon-moves/en/charizard&pikachu/string', done => {
        request(app)
            .get('/api/v1/pokemon-moves/en/charizard&pikachu/string')
            .end((err, response) => {
                assert(response.status === 200);
                assert(response.body.common_moves.length === 48);
                done();
            });
    });
});