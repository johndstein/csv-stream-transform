'use strict';

exports = module.exports = function(opts) {
  const parser = require('csv-parse')(
    Object.assign({
      columns: true
    }, opts.parse));
  const stringer = require('csv-stringify')(
    Object.assign({
      header: true
    }, opts.stringify));
  const transformer = new require('stream').Transform({
    transform(row, encoding, cb) {
      opts.transform.bind(transformer)(row, cb);
    },
    flush(cb) {
      if (opts.flush) {
        opts.flush.bind(transformer)(cb);
      } else {
        cb();
      }
    },
    objectMode: true
  });
  (opts.in || process.stdin)
    .pipe(parser)
    .pipe(transformer)
    .pipe(stringer)
    .pipe(opts.out || process.stdout);
};