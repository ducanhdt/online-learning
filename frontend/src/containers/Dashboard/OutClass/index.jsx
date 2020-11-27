import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import api from '../../../apis';
import { useSnackbar } from 'notistack';
import { useTranslation } from 'react-i18next';

export default function DeleteClassDialog({
  accessToken,
  classroomId,
  open,
  setOpen,
  fetch,
}) {
  const { enqueueSnackbar } = useSnackbar();
  const { t } = useTranslation();
  
  const handleSubmit = async () => {

    const { data } = await api.account.outClassroom(
      { classroomId },
      accessToken,
    );
    if (data.status) {
      fetch();
      enqueueSnackbar(t('dashboard.outSuccess'), { variant: 'success' });
      setOpen(false);
    }
    else {
      enqueueSnackbar(t('dashboard.outError'), { variant: 'error' });
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
          {t('dashboard.outClass')}
        </DialogTitle>
        <DialogContent>
          {t('dashboard.sureToGetOut')}
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
