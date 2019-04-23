process.env.NODE_ENV = 'test';

import chai from 'chai';
import chaiHttp from 'chai-http';

import userModel from '../app/models/users';

import testData from './data';

import app from '../app/index';

const should = chai.should();

chai.use(chaiHttp);

describe('Testing the index route', ()  => {
    it('it should return a simple message', (done) => {
        chai.request(app)
        .get('/')
        .end((err, resp) => {
            resp.should.have.status(200);
            resp.body.should.have.keys(['status', 'message']);
            done();
        })
    })
});

describe('Testing the authentication module', (done) => {
    beforeEach((done) => { 
        userModel.remove({}, (err) => { 
           done();           
        });        
    });

    it('it should register a new user', (done) => {
        chai.request(app)
        .post('/api/v1/auth/register')
        .send(testData['auth']['register'][0])
        .end((err, resp) => {
            resp.should.have.status(201);
            done();
        })
    });

    it('it should try to register a new user but fail with status 400', (done) => {
        chai.request(app)
        .post('/api/v1/auth/register')
        .send(testData['auth']['register'][1])
        .end((err, resp) => {
            resp.should.have.status(400);
            done();
        })
    });

    it('it should try to register a new user but fail with status 400', (done) => {
        chai.request(app)
        .post('/api/v1/auth/register')
        .send(testData['auth']['register'][2])
        .end((err, resp) => {
            resp.should.have.status(400);
            done();
        })
    });

    it('it should try to register a new user but fail with status 400', (done) => {
        chai.request(app)
        .post('/api/v1/auth/register')
        .send(testData['auth']['register'][3])
        .end((err, resp) => {
            resp.should.have.status(400);
            done();
        })
    });
})