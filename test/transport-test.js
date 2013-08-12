var expect = require('chai').expect
var rewire = require('rewire')
var transport
var winston

describe("StdErrorTransport", function () {

  before(function(){
    winston = require('winston')
    expect(winston.transports).to.not.have.ownProperty("StdError")
    transport = require('..')
    expect(winston.transports).to.have.ownProperty("StdError")
    removeConsole()
  })

  it('should exist', function () {
    expect(transport).to.exist
    expect(transport).to.be.a("function")
  })

  it('should be able to add it as a transport', function () {
    winston.add(transport)
    winston.remove(transport)
  })

  it('should have StdErr available as a transport', function () {
    expect(winston.transports).to.have.ownProperty("StdError")
  })

  it('should write to stderr', function (done) {
    transport = rewire('..')
    var msg = "hi there"

    transport.__set__("outputLine", function (output) {
      expect(output).to.equal("info: "+msg)
      done()
    })

    winston.add(transport)
    winston.info(msg)
  })

  function removeConsole () {
    if (winston.transports.Console) winston.remove(winston.transports.Console)
  }

})

