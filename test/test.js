const express = require('express');
const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
const server = require('../server');
const expect = require('chai').expect;
const request = require('request');

chai.use(chaiHttp);

describe('GET /', function() {
  it('should return a 200 status code', function(done) {
      chai.request(server)
      .get('/')
      .end(function(err, res) {
        res.should.have.status(200);
        done()
      })
  });
  it('should reroute to /form', function(done) {
    request("http://localhost:3000/", function(error, response, body) {
      expect(this.location.pathname).to.equal("http://localhost:3000/form/")
      done()
    })
  });
});

describe('GET /poll', function() {
  it('should return a 200 status code', function(done) {
      chai.request(server)
      .get('/poll')
      .end(function(err, res) {
        res.should.have.status(200);
        done()
      })
  });
  it('should display the form', function(done) {
    request("http://localhost:3000/", function(error, response, body) {
      expect(body).to.have("poll-form")
      done()
    })
  });
});

describe('GET api/poll/:id', function() {
  it('should return a 200 status code', function(done) {
      chai.request(server)
      .get('/api/poll/2353')
      .end(function(err, res) {
        res.should.have.status(200);
        done()
      })
  });
  it('should be an array', function(done) {
    chai.request(server)
    .get('/api/poll/2353')
    .end(function(err, res) {
      res.body.should.be.a('array');
      done()
    })
  })
});

describe('undefined routes', function(){
  it('respond with a 404', function(done){
    chai.request(server)
    .get('/not-real')
    .end(function(err, res) {
      res.should.have.status(404);
      done()
    })
  })
})
