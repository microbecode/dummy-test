#!/usr/bin/env node

// Run with: node reset-bytes.js 

const fs = require('fs');
fs.copyFileSync('index.js.backup', 'index.js');
console.log('reset done');