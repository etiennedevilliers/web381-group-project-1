const figlet = require('figlet');
const path = require('path');
const readline = require('readline');
const Compressor = require('./compressor');
const Extractor = require('./extractor');
const Navigator = require('./navigator');

let dir = path.join(__dirname, 'Default');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

const header = new Promise((resolve, reject) => {
    figlet("W e l c o m e  t o\nt h e  a m a z i n g\nE X T R A C T - I N A T O R !", (err, data) => {
        if (err) {
            console.log('Welcome to the amazing EXTRACT-INATOR!');
            console.dir(err);
            return;
        }

        console.log(data);
        resolve();
    });
});

header.then(() => {
    rl.question("Would you like to 'Compress Folders' or 'Extract Files'?\n1. Compress\n2. Extract\n0. Exit\n", (answer) => {
        switch (answer) {
            case "0":
                rl.close();
                break;

            case "1":
                //Compress - Paste folders to be compressed into /Default from Testing/ToCompress
                console.log("\nNavigate to Folder to Compress");
                let compress = new Promise(async (resolve, reject) => {
                    dir = await Navigator(dir, rl);
                    console.log(dir);
                    rl.question("\nCompression type: ", (compressionType) => {
                        Compressor(dir, compressionType);
                        resolve();
                    });
                });

                compress.then(() => {
                    rl.close();
                })
                break;
    
            case "2":
                //Extract - Paste folders to be extracted into /Default from Testing/ToExtract
                console.log("\nNavigate to Folder to Extract");
                let extract = new Promise(async (resolve, reject) => {
                    dir = await Navigator(dir, rl);
                    Extractor(dir);
                    resolve();
                });

                extract.then(() => {
                    rl.close();
                })
                break;
        
            default:
                break;
        }
    });
});