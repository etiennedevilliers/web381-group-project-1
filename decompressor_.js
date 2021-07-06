//Import modules
const decompress = require("decompress");
const path = require("path");
const fs = require("fs");

function decompresser(file_path) {
  //This is for getting the extension of the folder name
  const extension = path.extname(file_path);

  //First i need to check if the path contains a zipped folder
  if (extension == ".zip") {
    //This is for getting the filename excluding the extension
    const extracted_file_name = path.basename(file_path, extension);
    decompress(file_path, extracted_file_name); //The first parameter is the zipped file AND the second parameter is the name of new folder

    setTimeout(() => {
      const newFilePath = file_path.substr(0, file_path.lastIndexOf("."));
      fs.readdir(newFilePath + "\\" + extracted_file_name, (err, fls) => {
        if (err) {
          console.log("Error: " + err);
        } else {
          console.log("\nCurrent directory filenames");
          fls.forEach((file) => {
            let secondary_ext = path.extname(file);
            if (secondary_ext == ".zip") {
              const secondary_extracted_file_name = path.basename(
                file_path,
                extension
              );
              decompress(
                newFilePath + "\\" + extracted_file_name + "\\" + file,
                secondary_extracted_file_name +
                  "\\" +
                  secondary_extracted_file_name
              );
            } else {
              console.log(file);
            }
          });
        }
      });
    }, 1500);
  } else {
    fs.readdir(file_path, (err, fils) => {
      if (err) {
        console.log("Error: " + err);
      } else {
        fils.forEach((file) => {
          let secondary_ext = path.extname(file);
          if (secondary_ext == ".zip") {
            console.log("\nExtracted files: ");
            //Here i am getting the file name withouit the extension
            const secondary_extracted_file_name = path.basename(
              file,
              secondary_ext
            );
            //Here i am decompressing each file and storing it in
            //an inidvidual folder wih the name that i got above 'secondary_extracted_file_name'
            decompress(
              file_path + "\\" + file,
              file_path + "\\" + secondary_extracted_file_name
            );
            console.log(
              "Extrcated -> " +
                file +
                " in this folder -> " +
                secondary_extracted_file_name
            );
          } else {
            console.log(
              "The file is not of type .zip: " +
                file +
                "So no decompressing is needed."
            );
          }
        });
      }
    });
  }
}

module.exports = decompresser;
