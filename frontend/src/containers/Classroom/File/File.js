// import React, { useState, useRef } from 'react';
// import { Form, Row, Col, Button } from 'react-bootstrap';
// import Dropzone from 'react-dropzone';
// import axios from 'axios';
// import API from '../../../apis';


// const File = ({classId}) => {
//   const [file, setFile] = useState(null); // state for storing actual image
//   const [previewSrc, setPreviewSrc] = useState(''); // state for storing previewImage
//   const [state, setState] = useState({
//     title: '',
//     description: ''
//   });
//   const [errorMsg, setErrorMsg] = useState('');
//   const [isPreviewAvailable, setIsPreviewAvailable] = useState(false); // state to show preview only for images
//   const dropRef = useRef(); // React ref for managing the hover state of droppable area

//   const handleInputChange = (event) => {
//     setState({
//       ...state,
//       [event.target.name]: event.target.value
//     });
//   };
  
//   const onDrop = (files) => {
//     const [uploadedFile] = files;
//     setFile(uploadedFile);
  
//     const fileReader = new FileReader();
//     fileReader.onload = () => {
//       setPreviewSrc(fileReader.result);
//     };
//     fileReader.readAsDataURL(uploadedFile);
//     setIsPreviewAvailable(uploadedFile.name.match(/\.(jpeg|jpg|png)$/));
//   };
  
//   const updateBorder = (dragState) => {
//     if (dragState === 'over') {
//       dropRef.current.style.border = '2px solid #000';
//     } else if (dragState === 'leave') {
//       dropRef.current.style.border = '2px dashed #e9ebeb';
//     }
//   };  

//   const handleOnSubmit = async (event) => {
//     event.preventDefault();
//     try {
//       const { title, description } = state;
//       if (title.trim() !== '' && description.trim() !== '') {
//         if (file) {
          
//           const formData = new FormData();
//           formData.append('file', file);
//           formData.append('title', title);
//           formData.append('description', description);
//           formData.append('classroomId', classId);
//           console.log(formData);
//           setErrorMsg('');
//           console.log(classId);
//           const res = await axios.post(`http://localhost:8080/api/v1/upload`,  formData , {
//             headers: {
//               'Content-Type': 'multipart/form-data'
//             }
//           });
//           console.log(res.data);
//         } else {
//           setErrorMsg('Please select a file to add.');
//         }
//       } else {
//         setErrorMsg('Please enter all the field values.');
//       }
//     } catch (error) {
//       error.response && setErrorMsg(error.response.data);
//     }
//   };

//   return (
//     <React.Fragment>
//       <Form className="search-form" onSubmit={handleOnSubmit}>
//         {/* {errorMsg && <p className="errorMsg">{errorMsg}</p>} */}
//         <Row>
//           <Col>
//             <Form.Group controlId="title">
//               <Form.Control
//                 type="text"
//                 name="title"
//                 value={state.title || ''}
//                 placeholder="Enter title"
//                 onChange={handleInputChange}
//               />
//             </Form.Group>
//           </Col>
//         </Row>
//         <Row>
//           <Col>
//             <Form.Group controlId="description">
//               <Form.Control
//                 type="text"
//                 name="description"
//                 value={state.description || ''}
//                 placeholder="Enter description"
//                 onChange={handleInputChange}
//               />
//             </Form.Group>
//           </Col>
//         </Row>
//         <div className="upload-section">
//           <Dropzone 
//           onDrop={onDrop}
//           onDragEnter={() => updateBorder('over')}
//           onDragLeave={() => updateBorder('leave')}
//           >
//             {({ getRootProps, getInputProps }) => (
//             <div {...getRootProps({ className: 'drop-zone' })} ref={dropRef}>
//             <input {...getInputProps()} />
//             <p>Drag and drop a file OR click here to select a file</p>
//             {file && (
//           <div>
//             <strong>Selected file:</strong> {file.name}
//           </div>
//         )}
//       </div>
//     )}
//   </Dropzone>
//   {previewSrc ? (
//     isPreviewAvailable ? (
//       <div className="image-preview">
//         <img className="preview-image" src={previewSrc} alt="Preview" />
//           </div>
//         ) : (
//       <div className="preview-message">
//         <p>No preview available for this file</p>
//       </div>
//         )
//         ) : (
//     <div className="preview-message">
//       <p>Image preview will be shown here after selection</p>
//     </div>
//       )}
//       </div>
//         <Button variant="primary" type="submit">
//           Submit
//         </Button>
//       </Form>
//     </React.Fragment>
//   );
// };

// export default File;


import React, { useState,useRef } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import api from '../../../apis';
import { useSnackbar } from 'notistack';
import { useTranslation } from 'react-i18next';
import { Form, Row, Col } from 'react-bootstrap';
import Dropzone from 'react-dropzone';
import axios from 'axios';
import API from '../../../apis';

export default function AddClassDialog({
  accessToken,
  open,
  setOpen,
  fetch,
  classId
}) {
  const [file, setFile] = useState(null); // state for storing actual image
  const [previewSrc, setPreviewSrc] = useState(''); // state for storing previewImage
  const [errorMsg, setErrorMsg] = useState('');
  const [isPreviewAvailable, setIsPreviewAvailable] = useState(false); // state to show preview only for images
  const dropRef = useRef(); // React ref for managing the hover state of droppable area
  const { enqueueSnackbar } = useSnackbar();
  const { t } = useTranslation();
  const [description, setUserDescription] = useState('');
  const [name, setName] = useState('');
  const [descriptionError, setDescriptionError] = useState('');
  const [nameError, setNameError] = useState('');
  const handleChangeInput = (e, field) => {
    switch (field) {
      case 'name':
        setName(e.target.value);
        break;
      case 'description':
        setUserDescription(e.target.value);
        break;
      default:
        break;
    }
  };
  const validateAccount = () => {
    setDescriptionError('');
    if (name.length === 0) {
      setNameError(t("Require file title"));
      return false;
    }
    setNameError('');

    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateAccount()) return;
    try {
      if (name.trim() !== '' && description.trim() !== '') {
        if (file) {
          
          const formData = new FormData();
          formData.append('file', file);
          formData.append('title', name);
          formData.append('description', description);
          formData.append('classroomId', classId);
          console.log(formData);
          setErrorMsg('');
          console.log(classId);
          const res = await axios.post(`${process.env.REACT_APP_API_DOMAIN}/api/v1/upload`,  formData , {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          });
          console.log(res.data);
          setName("");
          setUserDescription("");
          setOpen(false);
        } else {
          setErrorMsg('Please select a file to add.');
        }
      } else {
        setErrorMsg('Please enter all the field values.');
      }
    } catch (error) {
      error.response && setErrorMsg(error.response.data);
    }
  };

  const onDrop = (files) => {
    const [uploadedFile] = files;
    setFile(uploadedFile);
  
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewSrc(fileReader.result);
    };
    fileReader.readAsDataURL(uploadedFile);
    setIsPreviewAvailable(uploadedFile.name.match(/\.(jpeg|jpg|png)$/));
  };

  const updateBorder = (dragState) => {
    if (dragState === 'over') {
      dropRef.current.style.border = '2px solid #000';
    } else if (dragState === 'leave') {
      dropRef.current.style.border = '2px dashed #e9ebeb';
    }
  };  

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          {"Upload File"}
        </DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            id="name"
            value={name}
            label="File Title"
            type="text"
            fullWidth
            error={nameError.length > 0}
            helperText={nameError}
            onChange={(e) => handleChangeInput(e, 'name')}
          />
          <TextField
            margin="dense"
            id="description"
            value={description}
            label="Description"
            type="text"
            fullWidth
            error={descriptionError.length > 0}
            helperText={descriptionError}
            onChange={(e) => handleChangeInput(e, 'description')}
          />
          <Dropzone 
          onDrop={onDrop}
          onDragEnter={() => updateBorder('over')}
          onDragLeave={() => updateBorder('leave')}
          >
            {({ getRootProps, getInputProps }) => (
            <div {...getRootProps({ className: 'drop-zone' })} ref={dropRef}>
            <input {...getInputProps()} />
            <p>Drag and drop a file OR click here to select a file</p>
            {file && (
          <div>
            <strong>Selected file:</strong> {file.name}
          </div>
            )}
          </div>
          )}
          </Dropzone>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            {t('dashboard.cancel')}
          </Button>
          <Button onClick={handleSubmit} color="primary">
            {t('dashboard.submit')}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
