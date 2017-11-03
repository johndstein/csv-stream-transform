'use strict';

function handle(err) {
  console.error(err.stack || err);
  process.exit(3);
}

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
  (opts.in || process.stdin).on('error', handle)
    .pipe(parser).on('error', handle)
    .pipe(transformer).on('error', handle)
    .pipe(stringer).on('error', handle)
    .pipe(opts.out || process.stdout).on('error', handle);
};