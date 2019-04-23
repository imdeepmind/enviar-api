import chai from 'chai';
import chaiHttp from 'chai-http';

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

