import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import api from '../../../apis';
import { useSnackbar } from 'notistack';
import { useTranslation } from 'react-i18next';
import Autosuggest from 'react-autosuggest';



function escapeRegexCharacters(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function getSuggestions(value, valueList) {
  const escapedValue = escapeRegexCharacters(value.trim());

  if (escapedValue === '') {
    return [];
  }

  const regex = new RegExp('\\b' + escapedValue, 'i');

  return valueList.filter((valueList) =>
    regex.test(getSuggestionValue(valueList)),
  );
}

function getSuggestionValue(suggestion) {
  return suggestion.email;
}
function renderSuggestion(suggestion) {
  return (
    <span>{suggestion.email}</span>
  );
}

export default function AddMemberDialog({ accessToken, open, setOpen, fetch, classroomId }) {
  const { enqueueSnackbar } = useSnackbar();
  const { t } = useTranslation();
  const [emails,setEmails] = useState([])
  const [email, setEmail] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const fetchEmails = async () => {
    const response = await api.admin.getAllAccount(accessToken,"email");
    // console.log("email list",response.data.results.accounts);
    setEmails(response.data.results.accounts)
  };

  useEffect(() => {
    fetchEmails();
  }, []);

  
  const onChange = (event, { newValue, method }) => {
   setEmail(newValue);
  };

  const inputProps = {
    placeholder: 'Email',
    value:email,
    onChange: onChange,
  };


  const onSuggestionsFetchRequested = ({ value }) => {
    // console.log("value",value);
    setSuggestions(getSuggestions(value,emails))
  };

  const onSuggestionsClearRequested = () => {
    setSuggestions([])
  };

  const handleSubmit = async () => {
    // console.log( { classroomId, email});
    if (email.length == 0) return;
    const { data } = await api.account.joinClassroom(
      { classroomId, email },
      accessToken,
    );
    // console.log({ data });
    if (data.status) {
      fetch();
      enqueueSnackbar(t('dashboard.addSuccess'), { variant: 'success' });
      setOpen(false);
    } else {
      enqueueSnackbar(t('dashboard.accountExist'), { variant: 'error' });
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
          <Autosuggest
            suggestions={suggestions}
            onSuggestionsFetchRequested={onSuggestionsFetchRequested}
            onSuggestionsClearRequested={onSuggestionsClearRequested}
            getSuggestionValue={getSuggestionValue}
            renderSuggestion={renderSuggestion}
            inputProps={inputProps}
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
