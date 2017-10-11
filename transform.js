#!/usr/bin/env node

'use strict';

// This is just an example file to show you how to use csv-stream-transform.

require('./')({
  transform(row, cb) {
    const o = {};
    o.Name = row.person.toUpperCase();
    o.Age = row.age - 10;
    this.push(o);
    this.push(o);
    cb(null);
  },
  // Flush isn't required. This flush method is a no-op.
  flush(cb) {
    cb();
  },
  // See http://csv.adaltas.com/parse for all options.
  parse: {
    delimiter: '\t'
  },
  // See http://csv.adaltas.com/stringify for all options.
  stringify: {
    // delimiter: '\t'
  },
  // You don't need to specify stdin or stdout here as they are the
  // defaults. We just included this to show how you can specify which
  // streams you want to use.
  in: process.stdin,
  out: process.stdout
});
