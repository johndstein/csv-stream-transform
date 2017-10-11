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
  // flush is optional.
  // defaults to no-op.
  flush(cb) {
    cb();
  },
  // parse is optional.
  // defaults to { columns: true }
  // See http://csv.adaltas.com/parse for all options.
  parse: {
    delimiter: '\t'
  },
  // stringify is optional.
  // defaults to { header: true }
  // See http://csv.adaltas.com/stringify for all options.
  stringify: {
    // delimiter: '\t'
  },
  // in is optional.
  // defaults to process.stdin
  in: process.stdin,
  // out is optional.
  // defaults to process.stdout
  out: process.stdout
});
