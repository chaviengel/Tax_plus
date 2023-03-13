const fs = require("fs")
createCostumerFolder = (path, name) => {
  const folderName = name;
  const folderPath = path
  const goodPath = folderPath + "/" + folderName
  if (!fs.existsSync(folderName)) {
    fs.mkdir(goodPath, (err) => {
      if (err) {
        console.error(err);
      } else {
        console.log(`Folder ${folderName} created successfully.`);
      }
    });
  } else {
    console.log(`Folder ${folderName} already exists.`);
  }

}
// fs.rename('sample.txt', 'sample_old.txt', function (err) {
//   if (err) throw err;
//   console.log('File Renamed.');
// });

// var fs = require('fs');
// fs.renameSync('sample.txt', 'sample_old.txt');
// console.log('File Renamed.');
module.exports = createCostumerFolder;