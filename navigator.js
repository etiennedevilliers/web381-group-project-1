const fs = require('fs');
const path = require('path');

function Navigate(currentDir, readline) {
    return new Promise((resolve, reject) => {
        readline.question("\nCurrent Folder: '" + currentDir + "'\n1. Select\n2. Navigate to a Sub-Folder\n3. Navigate to Parent Folder\n", (answer) => {
            switch (answer) {
                case "1":
                    resolve(currentDir);
                    break;
        
                case "2":
                    resolve(GetSub(currentDir, readline));
                    break;
    
                case "3":
                    resolve(Navigate(currentDir.substring(0, currentDir.lastIndexOf("\\")), readline));
                    break;
            
                default:
                    break;
            }
        });
    });
}

function GetSub(currentDir, readline) {
    return new Promise((resolve, reject) => {
        console.log("\nSub-Folders:");

        const directory = fs.readdirSync(currentDir);
        let folders = [];

        directory.forEach((item) => {
            const stats = fs.statSync(path.join(currentDir, item));

            if (stats.isDirectory()) {
                folders.push(item);
            }
        })
        
        for (let i = 0; i < folders.length; i++) {
            console.log((i + 1) + ". " + folders[i]);
        }

        readline.question("Choose a folder from the list above: ", (answer) => {
            for (let i = 0; i < folders.length; i++) {
                if (i + 1 == answer) {
                    resolve(Navigate(path.join(currentDir, folders[i]), readline));
                }
            }
        })
    });
}

module.exports = Navigate;