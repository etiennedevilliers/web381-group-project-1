  
const readline = require('readline-sync');
function MainDisplay(){
    console.log('\n===========================================');
    console.log('\x1b[45m%s\x1b[0m', "Welcome to group E_G_J_T_T's Extractinator");
    console.log('===========================================');
    console.log("");
    console.log("Select an option:");
    console.log('\x1b[33m%s\x1b[0m', "1. Compressing Folders");
    console.log('\x1b[34m%s\x1b[0m', "2. Extracting File");
    console.log('\x1b[32m%s\x1b[0m', "3. Exit");
    Menu();
}
function Menu(){
    
    var option = readline.question("Chosen option is: ");
        console.log('===============================================');
        switch (parseInt(option)){
            case 1:
                console.log("Compressing folder");
                break;
            case 2:
                console.log("Extracting File");
                break;
            case 3:
                break;
            default:
                break;
            
        }
}
MainDisplay();
