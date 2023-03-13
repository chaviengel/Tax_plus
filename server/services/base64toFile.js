const base64toFile = require('node-base64-to-file');

const uploadFile=async(base64_string,file_path,name,file_type)=>{
    const base64String ='data:image/png;base64,iVBORw0KGgo...';
    // const base64String =base64_string;
  try {
  const imagePath = await base64toFile(base64String, { filePath: file_path, fileName: name, types: [file_type], fileMaxSize: 3145728 });
    console.log(imagePath)
  } catch (error) {
    console.log(error)
  }
}
module.exports=uploadFile;

