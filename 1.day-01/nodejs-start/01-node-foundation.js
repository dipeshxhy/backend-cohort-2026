const fs = require('node:fs');
const path = require('node:path');
const os = require('node:os');

console.log('Nodejs', process.versions.node);
console.log('v8', process.versions.uv);
console.log('Platform', process.platform);
console.log('Architecture', process.arch);
console.log('CPU Cores', os.cpus().length);
console.log('Home Directory', os.homedir());

console.log(typeof global);
console.log(typeof globalThis);

//  what is global and globalThis
