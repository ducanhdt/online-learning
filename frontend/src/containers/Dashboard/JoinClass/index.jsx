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

export default function JoinClassDialog({
  accessToken,
  open,
  setOpen,
  fetch,
}) {
  const { enqueueSnackbar } = useSnackbar();
  const { t } = useTranslation();
  const [classId, setClassId] = useState('');
  const handleChangeInput = (e, field) => {
    switch (field) {
      case 'ClassId':
        setClassId(e.target.value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = async () => {
    if (classId.length===0) return;
    const { data } = await api.account.joinClassroom ({classroomId: classId},accessToken);
    //console.log({data});
    if (data.status) {
      fetch();
      enqueueSnackbar(t('dashboard.addSuccess'), { variant: 'success' });
      setOpen(false);
    }
    else {
      enqueueSnackbar(t('dashboard.wrongClassId'), { variant: 'error' });
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
          {t('dashboard.JoinClass')}
        </DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            id="ClassId"
            value={classId}
            label="ClassId"
            type="text"
            fullWidth
            error={classId.length > 0}
            helperText={classId.length === 0? t('dashboard.requireClassId') : ""}
            onChange={(e) => handleChangeInput(e, 'ClassId')}
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
