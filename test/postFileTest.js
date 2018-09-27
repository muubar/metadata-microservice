const chai = require('chai');
const { expect } = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const mocha = require('mocha');


chai.use(chaiHttp);


describe('POST file handler', function () {

  it('responds with the original file name, size, and type when a valid file is uploaded', function (done) {
    chai.request(server)
      .post('/api/fileanalyse/')
      .field('Content-Type', 'multipart/form-data')
      .attach('upfile', './test/test files/hello world.txt')
      .then(function (res) {
        expect(res).to.have.status(200);
        expect('Content-Type', /json/);
        expect(res.body.name).equals('hello world.txt');
        expect(res.body.type).equals('text/plain');
        expect(res.body.size).equals(11);
        done();
      })
  })

  it('responds with 422 error when a file that is larger than 5MBs is uploaded', function (done) {
    chai.request(server)
      .post('/api/fileanalyse/')
      .field('Content-Type', 'multipart/form-data')
      .attach('upfile', './test/test files/Pizigani.jpg')
      .then(function (res) {
        expect(res).to.have.status(422);
        expect('Content-Type', /json/);
        expect(res.body.error).equals('file size is too large');
        done();
      })
  })

})
