import fs from 'node:fs';

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

console.log('Hello from Top Level Code');

/**
 * Hello from Top Level Code
 * Hello from Timer
 * Hello from Immediate
 * Hello from File Read
 */
