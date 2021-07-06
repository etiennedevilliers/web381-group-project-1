const Compressor = require("./compressor");

let demoDir = "_compress-demo_";
let outputDir = "output";

//Compressor(demoDir, outputDir);

//This is decompressing example-test
const Decompresser = require("./decompressor_");
Decompresser(
  //We can do a zipped folder that containes other zipped folders - Like SO:
  "test-zipped-folder.zip"

  //OR - We can do an unzipped folder that containes other zipped folders - Like SO:
  //"test-unzipped-folder"
);
