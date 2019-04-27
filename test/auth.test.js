import chai from 'chai';
import chaiHttp from 'chai-http';

import userModel from '../app/models/users';

import testData from './sampleData/auth.data.test';

import app from '../app/index';

describe('Testing the authentication module', (done) => {
    before((done) => { 
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
            resp.body.should.have.keys(['name', 'username', 'email', 'country', 'dob', 'gender']);
            done();
        })
    });

    it('it should throw a badRequest error due to duplicate username', (done) => {
        chai.request(app)
        .post('/api/v1/auth/register')
        .send(testData['auth']['register'][1])
        .end((err, resp) => {
            resp.should.have.status(400);
            resp.body.should.have.keys(['statusCode', 'error', 'message']);
            done();
        })
    });

    it('it should throw a badRequest error due to duplicate email', (done) => {
        chai.request(app)
        .post('/api/v1/auth/register')
        .send(testData['auth']['register'][2])
        .end((err, resp) => {
            resp.should.have.status(400);
            resp.body.should.have.keys(['statusCode', 'error', 'message']);
            done();
        })
    });

    it('it should throw a badRequest error due to invalid date of birth', (done) => {
        chai.request(app)
        .post('/api/v1/auth/register')
        .send(testData['auth']['register'][3])
        .end((err, resp) => {
            resp.should.have.status(400);
            resp.body.should.have.property('statusCode');
            resp.body.should.have.property('error');
            resp.body.should.have.property('message');
            done();
        })
    });

    it('it should login to the system', (done) => {
        chai.request(app)
        .post('/api/v1/auth/login')
        .send(testData['auth']['login'][0])
        .end((err, resp) => {
            resp.should.have.status(202);
            resp.body.should.have.property('token');
            done();
        })
    });

    it('it should try to login to the system but throws a 401 error', (done) => {
        chai.request(app)
        .post('/api/v1/auth/login')
        .send(testData['auth']['login'][1])
        .end((err, resp) => {
            resp.should.have.status(400);
            resp.body.should.have.property('statusCode');
            resp.body.should.have.property('error');
            resp.body.should.have.property('message');
            done();
        })
    });

    it('it should try to login to the system but throws a 404 error', (done) => {
        chai.request(app)
        .post('/api/v1/auth/login')
        .send(testData['auth']['login'][2])
        .end((err, resp) => {
            resp.should.have.status(404);
            resp.body.should.have.property('statusCode');
            resp.body.should.have.property('error');
            resp.body.should.have.property('message');
            done();
        })
    });

    it('it should try to login to the system but throws a 401 error', (done) => {
        chai.request(app)
        .post('/api/v1/auth/login')
        .send(testData['auth']['login'][3])
        .end((err, resp) => {
            resp.should.have.status(401);
            resp.body.should.have.property('statusCode');
            resp.body.should.have.property('error');
            resp.body.should.have.property('message');
            done();
        })
    });

    it('it should check the existance of a specific username', (done) => {
        chai.request(app)
        .get('/api/v1/auth/username/imdeepmind')
        .end((err, resp) => {
            resp.should.have.status(200);
            resp.body.should.have.keys(['message', 'data']);
            done();
        })
    });

    it('it should try to check username but throws an error', (done) => {
        chai.request(app)
        .post('/api/v1/auth/username/lkjhgasd')
        .end((err, resp) => {
            resp.should.have.status(404);
            resp.body.should.have.property('statusCode');
            resp.body.should.have.property('error');
            resp.body.should.have.property('message');
            done();
        })
    });

    it('it should check the existance of a specific username', (done) => {
        chai.request(app)
        .get('/api/v1/auth/email/infinityatme@gmail.com')
        .end((err, resp) => {
            resp.should.have.status(200);
            resp.body.should.have.keys(['message', 'data']);
            done();
        })
    });

    it('it should try to check email but throws an error', (done) => {
        chai.request(app)
        .post('/api/v1/auth/email/lkjhgasd')
        .end((err, resp) => {
            resp.should.have.status(404);
            resp.body.should.have.property('statusCode');
            resp.body.should.have.property('error');
            resp.body.should.have.property('message');
            done();
        })
    });
})