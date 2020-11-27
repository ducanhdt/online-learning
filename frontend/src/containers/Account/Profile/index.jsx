import React, { useState } from 'react';
import clsx from 'clsx';
import { useSelector } from 'react-redux';
import {
  Avatar as AvatarMT,
  Button,
  Dialog,
  DialogTitle,
  Tooltip,
} from '@material-ui/core';
import Avatar from 'react-avatar-edit';
import { useSnackbar } from 'notistack';
import api from '../../../apis';
import useStyles from './style';

function ChangeAvata(props) {
  const { open, onClose, onSubmit } = props;
  const [state, setState] = useState({
    preview: null,
    src: null,
  });

  const handleCrop = (preview) => {
    setState({ ...state, preview });
  };

  const handleSubmit = () => {
    onSubmit(state.preview);
  };

  const onBeforeFileLoad = (elem) => {
    if (elem.target.files[0].size > 11171680) {
      alert('File is too big!');
      // eslint-disable-next-line no-param-reassign
      elem.target.value = '';
    }
  };
  const handleClose = () => {
    setState({ ...state, preview: null });
    onClose();
  };

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={open}
    >
      <DialogTitle id="simple-dialog-title">Set backup account</DialogTitle>
      <Avatar
        width={390}
        height={295}
        onCrop={handleCrop}
        onClose={handleClose}
        onBeforeFileLoad={onBeforeFileLoad}
        src={state.src}
      />
      <Button color="primary" fullWidth variant="text" onClick={handleSubmit}>
        Change Avatar
      </Button>
    </Dialog>
  );
}

const Profile = ({ className, ...rest }) => {
  // const dispatch = useDispatch();
  const { avatar, name, accessToken } = useSelector((state) => state.auth);
  const { enqueueSnackbar } = useSnackbar();
  const [open, setOpen] = useState(false);
  const classes = useStyles();
  const [localAvatar, setLocalAvatar] = React.useState(avatar);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (value) => {
    setOpen(false);
    // call Api
    const { data: uploadData } = await api.upload.uploadImage(
      { imageData: value },
      accessToken,
    );

    const updateDatas = {
      avatar: uploadData.result.link,
    }
    if (uploadData.status) {
      const { data } = await api.account.changeAccountInfo(
        updateDatas,
        accessToken,
      );
      if (data.status === 1) {
        enqueueSnackbar('Successfully!', { variant: 'success' });
        setLocalAvatar(value);
      } else {
        enqueueSnackbar(data.message, { variant: 'error' });
      }
    }
  };

  return (
    <>
      <Tooltip title="Change Avatar">
        <AvatarMT
          className={classes.avatar}
          src={localAvatar}
          onClick={handleClickOpen}
        />
      </Tooltip>
      <ChangeAvata open={open} onClose={handleClose} onSubmit={handleSubmit} />
    </>
  );
};

export default Profile;
