import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import api from '../../../apis';
import { useSnackbar } from 'notistack';
import { useTranslation } from 'react-i18next';

export default function AddClassDialog({
  accessToken,
  open,
  setOpen,
  fetch,
}) {
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
      setNameError(t('dashboard.nameRequire'));
      return false;
    }
    setNameError('');

    return true;
  };

  const handleSubmit = async () => {
    if (!validateAccount()) return;
    const { data } = await api.classroom.addClassroom({ name, description }, accessToken);
    //console.log({data});
    if (data.status) {
      fetch();
      enqueueSnackbar(t('dashboard.addSuccess'), { variant: 'success' });
      setName("");
      setUserDescription("");
      setOpen(false);
    }
    else {
      enqueueSnackbar(t('dashboard.classExist'), { variant: 'error' });
      setOpen(false);
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
          {t('dashboard.createClass')}
        </DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            id="name"
            value={name}
            label="Name"
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
