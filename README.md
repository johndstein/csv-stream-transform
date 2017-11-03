# csv-stream-transform

Node.js module for stream transforming CSV.

This is a very thin wrapper around `csv-parse` and `csv-stringify`.

## Install

```
npm install csv-stream-transform
```

## Usage

The following command will clone joe and nancy, make them much more important,
10 years younger, and change the tab separated file to a comma separated file.

```
./transform.js < in.tsv > out.csv
```

**./transform.js**

```
#!/usr/bin/env node

'use strict';

// This is just an example file to show you how to use csv-stream-transform.

require('csv-stream-transform')({
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
    // delimiter: ','
  },
  // in is optional.
  // defaults to process.stdin
  in: process.stdin,
  // out is optional.
  // defaults to process.stdout
  out: process.stdout
});
```

**in.tsv**

```
person<TAB>age
joe smith<TAB>37
nancy foo<TAB>98
```

**out.csv**

```
Name,Age
JOE SMITH,27
JOE SMITH,27
NANCY FOO,88
NANCY FOO,88
```
