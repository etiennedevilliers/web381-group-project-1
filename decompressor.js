const Seven = require('node-7z');
const path = require('path');
const fs = require('fs');

const supportedTypes = ['zip', '7z', 'rar', 'tar'];

function decompressDir (directoryPath, name) {
    directoryPath = path.join(directoryPath, name.substring(0, name.lastIndexOf(".")));

    console.log(`Decompressing ${directoryPath}`);
    let myStream = Seven.extract(directoryPath + '.' + name.split('.').splice(-1)[0], directoryPath, {
        recursive: true,
        $cherryPick: '*.*'
      });
    
    myStream.on('end', function () {

        fs.rm(directoryPath + '.' + name.split('.').splice(-1)[0], {
            recursive: true,
          }, (err) => {
            if (err != null) 
                console.log(err);
        })

        console.log(name + " extracted");

        return new Promise((resolve) => {fs.readdir(directoryPath, (err, files) => {
            if (err) {
                console.log('Unable to scan directory: ' + err);
                error('Unable to scan directory: ' + err)
                return;
            } 
    
            let awaits = []
            
            files.forEach(function (file) {
                var stats = fs.statSync(path.join(directoryPath, file));

                if (stats.isFile()) {
                    if (supportedTypes.includes(file.split('.').splice(-1)[0])) {
                        awaits.push(decompressDir(
                            directoryPath,
                            file
                        ));
                    } else {
                        awaits.push(new Promise((resolve) => {
                            fs.copyFile(path.join(directoryPath, file), path.join(directoryPath, file), (err) => {
                                if (err) throw err;
                                resolve();
                            })
                        }));
                    }
                }
            });
        
            Promise.all(awaits).then(() => {
                resolve();
            }).then(resolve);
        })});
    });
}

function Decompress(outputDir) {
    return new Promise((resolve) => {
        fs.readdir(path.join(__dirname, outputDir), (err, files) => {        
            let awaits = []
        
            // Find only folders in outputDir
            files.forEach(function (file) {
                var stats = fs.statSync(path.join(path.join(__dirname, outputDir), file));
                    
                if (stats.isFile()) {
                    console.log(supportedTypes.includes(file.split('.').splice(-1)[0]));
                    if (supportedTypes.includes(file.split('.').splice(-1)[0])) {

                        awaits.push(decompressDir(
                            path.join(__dirname, outputDir),
                            file
                        ));
                    }
                } 
            });
        
            Promise.all(awaits).then(() => {
                return resolve();
            }).then(resolve);
        });        
    });
}

module.exports = Decompress;