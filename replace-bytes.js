// Run with: node replace-bytes.js <original_hex> <replacement_hex>
// With current structure, index.js bytes are at package offset 44-1512.
// publish with: npm version patch --no-git-tag-version && npm publish

const fs = require('fs');
const [,, originalHex, replacementHex] = process.argv;
if (!originalHex || !replacementHex) {
  console.log('Usage: node replace-bytes.js <original_hex> <replacement_hex>');
  process.exit(1);
}
const originalBytes = Buffer.from(originalHex.replace(/^0x/, ''), 'hex');
const replacementBytes = Buffer.from(replacementHex.replace(/^0x/, ''), 'hex');
const file = 'index.js';
const buf = fs.readFileSync(file);
const idx = buf.indexOf(originalBytes);
if (idx === -1) {
  console.log('not found');
  process.exit(1);
}
replacementBytes.copy(buf, idx);
fs.writeFileSync(file, buf);
console.log('replace done'); 