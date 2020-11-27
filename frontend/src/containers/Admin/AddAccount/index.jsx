import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import api from '../../../apis';
import { useSnackbar } from 'notistack';
import { validateEmail } from '../../../utils/string';
import { useTranslation } from 'react-i18next';

export default function FormDialog({
  accessToken,
  open,
  setOpen,
  fetchAccounts,
}) {
  const { enqueueSnackbar } = useSnackbar();
  const { t } = useTranslation();
  const [email, setUserEmail] = useState('');
  const [name, setName] = useState('');
  const [emailError, setEmailError] = useState('');
  const [nameError, setNameError] = useState('');
  const handleChangeInput = (e, field) => {
    switch (field) {
      case 'name':
        setName(e.target.value);
        break;
      case 'email':
        setUserEmail(e.target.value);
        break;
      default:
        break;
    }
  };
  const validateAccount = () => {
    if (email.length === 0) {
      setEmailError(t('adminPage.emailRequire'));
      return false;
    }
    if (!validateEmail(email)) {
      setEmailError(t('adminPage.emailWrong'));
      return false;
    }
    setEmailError('');
    if (name.length === 0) {
      setNameError(t('adminPage.nameRequire'));
      return false;
    }
    setNameError('');

    return true;
  };

  const handleSubmit = async () => {
    if (!validateAccount()) return;
    const { data } = await api.admin.addAccount({ name, email }, accessToken);
    if (data.status) {
      fetchAccounts();
      enqueueSnackbar(t('adminPage.addSuccess'), { variant: 'success' });
      setOpen(false);
    }
    if (data.code === 500) {
      enqueueSnackbar(t('adminPage.accountExist'), { variant: 'error' });
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
          {t('adminPage.addUser')}
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
            id="email"
            value={email}
            label="Email"
            type="text"
            fullWidth
            error={emailError.length > 0}
            helperText={emailError}
            onChange={(e) => handleChangeInput(e, 'email')}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            {t('adminPage.cancel')}
          </Button>
          <Button onClick={handleSubmit} color="primary">
            {t('adminPage.submit')}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
