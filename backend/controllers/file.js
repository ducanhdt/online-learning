const multer = require('multer');
const fileService = require('../services/file');


const uploadFile = async (req, res) => {
    const { title, description } = req.body;
    const { path, mimetype } = req.file;
    const file = new File({
        title,
        description,
        file_path: path,
        file_mimetype: mimetype
      });
    const result = await fileService.createFile({file});
    res.send('file uploaded successfully.');
};

const getAllFiles =async (req,res)=>{
    const sortedByCreationDate = await fileService.findAllFilesByClassId({});
    
      return res.send({ status: 1, result: sortedByCreationDate });
};

const downloadFile = async (req,res) =>{
    const fileId = req.params.id
    const file = await fileService.findFileById({
        fileId
      });
    res.set({'Content-Type': file.file_mimetype});
    res.sendFile(path.join(__dirname, '..', file.file_path));
}