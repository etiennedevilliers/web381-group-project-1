const readline = require('readline-sync');
function MainDisplay(){
    console.log('==================================================');
    console.log("Welcome to the Dashboard");
    console.log("");
    console.log("Select a option:");
    console.log("1. Compressing Folders");
    console.log("2. Extracting File");
    console.log("3. Exit");
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