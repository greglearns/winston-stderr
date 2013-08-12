var winston = require('winston')
var util = require('util')
var common = require('winston/lib/winston/common')

var Console = winston.transports.Console
var StdErrorTransport

StdErrorTransport = function(options) {
  Console.call(this, options)
}

util.inherits(StdErrorTransport, Console)

winston.transports.StdError = StdErrorTransport
StdErrorTransport.prototype.name = "StdError"

//
// ### function log (level, msg, [meta], callback)
// #### @level {string} Level at which to log the message.
// #### @msg {string} Message to log
// #### @meta {Object} **Optional** Additional metadata to attach
// #### @callback {function} Continuation to respond to when complete.
// Core logging method exposed to Winston. Metadata is optional.
//
StdErrorTransport.prototype.log = function (level, msg, meta, callback) {
  if (this.silent) {
    return callback(null, true);
  }

  var self = this,
      output;

  output = common.log({
    colorize:    this.colorize,
    json:        this.json,
    level:       level,
    message:     msg,
    meta:        meta,
    stringify:   this.stringify,
    timestamp:   this.timestamp,
    prettyPrint: this.prettyPrint,
    raw:         this.raw,
    label:       this.label
  });

  outputLine(output);

  //
  // Emit the `logged` event immediately because the event loop
  // will not exit until `process.stdout` has drained anyway.
  //
  self.emit('logged');
  callback(null, true);
};

function outputLine (output) {
  process.stderr.write(output + '\n');
}

module.exports = StdErrorTransport

