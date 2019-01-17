const chai = require('chai');
const chaiHttp = require('chai-http');

const expect = chai.expect;

const {app} = require('../server');

chai.use(chaiHttp);

describe('should add 200 with html display', function() {
  
  it('should be 200 status', function() {
    return chai.request(app)
    .get('/')
    .then(function(res) {
      expect(res).to.be.status(200);
      //expect(res,body).to.deep.equal('<p>Hello world</p>');
      done();
    })
  });
});