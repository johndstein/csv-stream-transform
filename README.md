# csv-stream-transform

Node.js module for stream transforming CSV.

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

require('csv-stream-transform')({
  transform(row, cb) {
    const o = {};
    o.Name = row.person.toUpperCase();
    o.Age = row.age - 10;
    this.push(o);
    this.push(o);
    cb(null);
  },
  flush(cb) {
    cb();
  },
  parse: {
    delimiter: '\t'
  },
  stringify: {
    // delimiter: '\t'
  },
  in: process.stdin,
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