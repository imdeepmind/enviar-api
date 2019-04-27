import chai from 'chai';
import chaiHttp from 'chai-http';

import userModel from '../app/models/users';

import testData from './sampleData/auth.data.test';

import app from '../app/index';

let token = '';

describe('Testing the me module', () => {
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

    it('it should login', (done) => {
        chai.request(app)
        .post('/api/v1/auth/login')
        .send(testData['auth']['login'][0])
        .end((err, resp) => {
            resp.should.have.status(202);
            resp.body.should.have.property('token');
            token = resp.body.token;
            done();
        })
    });

    it('it should show the my details', (done) => {
        chai.request(app)
        .get('/api/v1/me/')
        .set('Authorization', token)
        .end((err, resp) => {
            resp.should.have.status(200);
            resp.body.should.be.a('object');
            done();
        })
    })
});