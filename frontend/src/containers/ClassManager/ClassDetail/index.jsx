import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import MaterialTable from 'material-table';
import { Delete } from '@material-ui/icons';
import { Typography, Button, Avatar } from '@material-ui/core';
import api from '../../../apis';

import AddMemberDialog from '../AddMember';

import useStyles from './index.style';
import FilterNoneIcon from '@material-ui/icons/FilterNone';
import { useSnackbar } from 'notistack';
import { useHistory } from 'react-router-dom';

export default function ClassDetail({ accessToken, classroomId }) {
  const [openAdd, setOpenAdd] = useState(false);
  const [openJoin, setOpenJoin] = useState(false);
  const [openOut, setOpenOut] = useState(false);
  const history = useHistory();

  const [choiceClass, setChoiceClass] = useState('');
  const [classInfo, setClassInfo] = useState({ name: '', member: [] });
  const [classrooms, setClassrooms] = useState([]);
  const classes = useStyles();
  const { t } = useTranslation();

  const { enqueueSnackbar } = useSnackbar();
  const fetchClassrooms = async () => {
    const { data } = await api.classroom.getClassroom(
      { classroomId },
      accessToken,
    );
    // console.log(data.result);
    if (data.status) {
      setClassInfo(data.result);
      // console.log(data.result);
    }
  };

  const copyToClip = (dataToLoad) => {
    navigator.clipboard.writeText(dataToLoad);
    enqueueSnackbar(t('dashboard.copySuccess'), { variant: 'success' });
  };

  const handleOpenAdd = () => {
    //console.log("add member to this class");
    setOpenAdd(true);
  };

  const handleOpenJoin = () => {
    setOpenJoin(true);
  };

  const handleOpenOut =  async(accountId) => {
    const { data } = await api.account.outClassroom(
      { classroomId, accountId },
      accessToken,
    );
    if (data.status) {
      fetchClassrooms();
      enqueueSnackbar(t('dashboard.outSuccess'), { variant: 'success' });
    }
    else {
      enqueueSnackbar(t('dashboard.outError'), { variant: 'error' });
    }
  };

  useEffect(() => {
    fetchClassrooms();
  }, [classroomId]);

  const columns = [
    {
      title:  t('adminClass.name'),
      field: 'name',
      render: (record) => (
        <div className={classes.column}>
          <Avatar src={record.avatar} className={classes.avatar}>
            {!record.avatar && record.name.slice(0, 1)}
          </Avatar>
          <Typography>{record.name}</Typography>
        </div>
      ),
    },
    { title: t('adminClass.email'), field: 'email' },
    {
      title: t('adminClass.action'),
      key: 'action',
      render: (record) => (
        <div>
          <Button
            onClick={() => {
              copyToClip(record.id);
            }}
          >
            <FilterNoneIcon />
          </Button>
          <Button onClick={() => handleOpenOut(record.id)}>
            <Delete color="error" />
          </Button>
        </div>
      ),
    },
  ];
  let table = (
    <div>
      <AddMemberDialog
        open={openAdd}
        accessToken={accessToken}
        fetch={fetchClassrooms}
        classroomId={classroomId}
        setOpen={(value) => setOpenAdd(value)}
      />
      <MaterialTable
        style={{ padding: '16px 32px' }}
        title= {t('adminClass.classTitle')}//+(classInfo && classInfo.name)}
        columns={columns}
        data={classInfo && classInfo.member}
        options={{ headerStyle: { fontWeight: 'bold' },exportButton: true }}
        actions=
        {[
          {
            icon: 'add',
            tooltip: 'Add Member To This Class',
            isFreeAction: true,
            onClick: (event) => handleOpenAdd(),
          },
        ]}
        localization={{ toolbar: { searchPlaceholder: t('dashboard.search') } }}
      />
    </div>
  )
  let render = classInfo?table:<div></div>
  return render;
}
