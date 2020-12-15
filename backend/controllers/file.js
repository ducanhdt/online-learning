const multer = require('multer');
const fileService = require('../services/file');
const File = require('../models/file');
const path = require('path');

const uploadFile = async (req, res) => {  

    const { classroomId, title, description } = req.body;
    const { path, mimetype } = req.file;
    const file = new File({
        class:classroomId,
        title,
        description,
        file_path: path,
        file_mimetype: mimetype
      });
    await file.save();
    // const result = await fileService.createFile({file});
    res.send('file uploaded successfully.');
};

const getAllFiles =async (req,res)=>{
  
  //const classroom = req.query.identity;
  // console.log(req.params.classid);
  const classId= req.params.classid;
  const file = await fileService.findAllFilesByClassId({classId});
  //console.log("result:")
  //console.log(file);
  return res.send({ status: 1, result: file });
};

const downloadFile = async (req,res) =>{
  console.log("download file")
  const fileId = req.params.id
  //console.log(fileId);
  const file = await fileService.findFileById({
        fileId
  });
  console.log(file);
  res.set({'Content-Type': file.file_mimetype});
  res.sendFile(path.join(__dirname, '..', file.file_path));
}

module.exports = {
  downloadFile,
  getAllFiles,
  uploadFile,
};
