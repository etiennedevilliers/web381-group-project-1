const readline = require('readline');
const Compressor = require('./compressor');
const Decompressor = require('./decompressor');

let outputDir = 'Output';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

rl.question("Compress or Decompress?\n1. Compress\n2. Decompress\n", (answer) => {
    switch (answer) {
        case "1":
            //Compress - Paste folders to be compressed into /Output from Input/ToCompress
            Compressor(outputDir);
            break;

        case "2":
            //Decompress - Paste folders to be decompressed into /Output from Input/ToDecompress
            Decompressor(outputDir);
            break;
    
        default:
            break;
    }

    rl.pause();
});