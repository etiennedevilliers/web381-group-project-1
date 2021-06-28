const Seven = require('node-7z');
const path = require('path');
const fs = require('fs');
const { Console } = require('console');
const { resolve } = require('path');

let tempDir = 'temp';

function getDepthTab(depth) {
    let depthString = '';
    for (let i = 0; i < depth; i++) depthString += '    ';
    return depthString;
}

// Recursive directory compress function
function compressDir (directoryPath, tempPath, name, depth) {
    if (!fs.existsSync(tempPath)){
        fs.mkdirSync(tempPath);
    }

    return new Promise((resolve) => {fs.readdir(directoryPath, (err, files) => {
        if (err) {
            console.log('Unable to scan directory: ' + err);
            error('Unable to scan directory: ' + err)
            return;
        } 

        let awaits = [];

        console.log(getDepthTab(depth) + name);
        
        
        // iterate through items in directory. Compress sub folders and Copy files
        files.forEach(function (file) { 
            var stats = fs.statSync(path.join(directoryPath, file));
            
            if (stats.isDirectory()) {
                awaits.push(compressDir(
                    path.join(directoryPath, file), 
                    path.join(tempPath, file), 
                    file, 
                    depth + 1
                ));
            
            } else {
                awaits.push(new Promise((resolve) => {
                    fs.copyFile(path.join(directoryPath, file), path.join(tempPath, file), (err) => {
                        if (err) throw err;
                        console.log(getDepthTab(depth + 1) + file + ' copied');
                        resolve();
                    })
                }));
            }
        });

        // Wait for all files to copy and sub folders to compress. Procede to compress directory and then delete completed directory 
        Promise.all(awaits).then(() => {return new Promise((resolve) => { 
            const myStream = Seven.add(tempPath + '.zip', tempPath, {
                    recursive: true
            })
    
            myStream.on('end', function () {
                fs.rmdir(tempPath, {
                    recursive: true,
                  }, (err) => {
                    if (err != null) 
                        console.log(err);
                    resolve();
                })
                
            })
        })}).then(resolve);
    })});
}




// Compress all folders in a direcoty
function Compress(demoDir, outputDir) {
    return new Promise((resolve) => {
        fs.readdir(path.join(__dirname, demoDir), (err, files) => {
            if (!fs.existsSync(path.join(__dirname, tempDir))){
                fs.mkdirSync(path.join(__dirname, tempDir));
            }
        
            let compressing = []
        
            // Find only folders in demoDir
            files.forEach(function (file) {
                var stats = fs.statSync(path.join(path.join(__dirname, demoDir), file));
                    
                if (stats.isDirectory()) {
                    compressing.push(compressDir(
                        path.join(path.join(__dirname, demoDir), file),
                        path.join(path.join(__dirname, tempDir), file),
                        file
                    ));
                    
                } 
            });
        
            Promise.all(compressing).then(() => {
                return new Promise((resolve) => {
                    fs.rename(path.join(__dirname, tempDir), path.join(__dirname, outputDir), (err) => {
                        resolve();
                    });
                })
            }).then(resolve);
        });        
    });
}

module.exports = Compress;