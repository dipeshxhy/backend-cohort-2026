import fs from 'node:fs';

setTimeout(() => {
  console.log('Hello from Timer');
}, 0);
setImmediate(() => {
  console.log('Hello from Immediate');
}, 0);
console.log('Hello from Top Level Code');

/**
 * Hello from Top Level Code
 * Hello from Timer
 * Hello from Immediate
 */
