const express = require('express')
const chai = require('chai')
const should = chai.should()
const chaiHttp = require('chai-http')
const server = require('../server')
const expect = require('chai').expect
const request = require('supertest')
const assert = require('assert')

chai.use(chaiHttp)

describe('GET /', function() {
  it('should return a 200 status code', function() {
      chai.request(server)
      .get('/')
      .end(function(err, res) {
        res.should.have.status(200)
        done()
      })
  })
  it('should reroute to /form', function() {
    request("http://localhost:3000/", function(err, res, body) {
      res.header['location'].should.include('/form')
    })
  })
})

describe('GET /form', function() {
  it('should return a 200 status code', function() {
      chai.request(server)
      .get('/poll')
      .end(function(err, res) {
        res.should.have.status(200)
        done()
      })
  })
  it('should display the form', function() {
    request("http://localhost:3000/", function(err, res, body) {
      res.body.should.have.property('form-page')
      done()
    })
  })
})

describe('GET api/poll/:id', function() {
  it('should return a 200 status code', function() {
      chai.request(server)
      .get('/api/poll/3449c9e5e332f1dbb81505cd739fbf3f')
      .end(function(err, res) {
        res.should.have.status(200)
        done()
      })
  })
  it('should be an object', function() {
    chai.request(server)
    .get('/api/poll/3449c9e5e332f1dbb81505cd739fbf3f')
    .end(function(err, res) {
      res.should.have.status(200)
      done()
    })
  })
})

describe('POST /form', () => {
  it('should return a 200 status code', function() {
    chai.request(server)
    .post('/api/form')
    .end(function(err, res) {
      res.should.have.status(200)
      done()
    })
  })
})

describe('undefined routes', function(){
  it('respond with a 404', function(){
    chai.request(server)
    .get('/not-real')
    .end(function(err, res) {
      res.should.have.status(404)
      done()
    })
  })
})
