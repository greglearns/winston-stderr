winston-stderr
==============

[![Build Status](https://travis-ci.org/greglearns/winston-stderr.png?branch=master)](https://travis-ci.org/greglearns/winston-stderr)


Works the same as Winston.transports.Console, but logs everything to stderr.

Installation
============

```bash
npm install -S winston-stderr
```

Usage
=====

```javascript
var winston = require('winston')
var winstonStderr = require('winston-stderr')

winston.add(winstonStderr)
winston.log('this will appear on stderr')
```

License
=======
MIT

