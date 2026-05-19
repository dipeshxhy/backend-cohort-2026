import fs from 'node:fs';
import crypto from 'node:crypto';

const start = Date.now();

process.env.UV_THREADPOOL_SIZE = 4;

setTimeout(() => {
  console.log('Hello from Timer');
}, 0);
setImmediate(() => {
  console.log('Hello from Immediate');
}, 0);

fs.readFile('sample.txt', 'utf-8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log('Hello from File Read');

  setTimeout(() => {
    console.log('Time 2');
  }, 0);
  setTimeout(() => {
    console.log('Time 3');
  }, 0);

  setImmediate(() => {
    console.log('Immediate 2');
  });
});

crypto.pbkdf2('password', 'salt', 100000, 64, 'sha512', () => {
  console.log(`Password encrypted in ${Date.now() - start} ms`);
});
crypto.pbkdf2('password', 'salt', 100000, 64, 'sha512', () => {
  console.log(`Password encrypted in ${Date.now() - start} ms`);
});
crypto.pbkdf2('password', 'salt', 100000, 64, 'sha512', () => {
  console.log(`Password encrypted in ${Date.now() - start} ms`);
});
crypto.pbkdf2('password', 'salt', 100000, 64, 'sha512', () => {
  console.log(`Password encrypted in ${Date.now() - start} ms`);
});

console.log('Hello from Top Level Code');
