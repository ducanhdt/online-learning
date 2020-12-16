import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import MaterialTable from 'material-table';
import { Delete, Add } from '@material-ui/icons';
import { Typography, Button, Avatar, TablePagination } from '@material-ui/core';
import api from '../../apis';
import AddClassDialog from './AddClass';
import JoinClassDialog from './JoinClass';
import DeleteClassDialog from './OutClass';
import useStyles from './index.style';
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';
import FilterNoneIcon from '@material-ui/icons/FilterNone';
import { useSnackbar } from 'notistack';
import { useHistory } from 'react-router-dom';

export default function ClassList({ accessToken }) {
  const [openAdd, setOpenAdd] = useState(false);
  const [openJoin, setOpenJoin] = useState(false);
  const [openOut, setOpenOut] = useState(false);
  // const [openJoin, setOpenJoin] = useState(0);
  const history = useHistory();

  const [choiceClass, setChoiceClass] = useState('');

  const [classrooms, setClassrooms] = useState([]);
  const classes = useStyles();
  const { t } = useTranslation();

  const { enqueueSnackbar } = useSnackbar();
  const fetchClassrooms = async () => {
    const { data } = await api.account.getClassroom(accessToken);
    if (data.status) {
      setClassrooms(
        data.result.classroomId.map((classroom) => ({
          ...classroom,
          key: classroom.id,
        })),
      );
    }
  };

  const copyToClip = (dataToLoad) => {
    navigator.clipboard.writeText(dataToLoad);
    enqueueSnackbar(t('dashboard.copySuccess'), { variant: 'success' });
  };

  const handleOpenAdd = () => {
    setOpenAdd(true);
  };

  const handleOpenJoin = () => {
    setOpenJoin(true);
  };

  const handleOpenOut = (id) => {
    setChoiceClass(id);
    setOpenOut(true);
  };

  useEffect(() => {
    fetchClassrooms();
  }, []);

  const columns = [
    {
      title: t('dashboard.name'),
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
    { title: t('dashboard.description'), field: 'description' },
    {
      title: t('dashboard.action'),
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
          <Button
            onClick={() => {
              //console.log(`classroom/${record.id}`);
              history.push(`classroom/${record.id}`);
            }}
          >
            <MeetingRoomIcon />
          </Button>
          <Button onClick={() => handleOpenOut(record.id)}>
            <Delete color="error" />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <AddClassDialog
        open={openAdd}
        accessToken={accessToken}
        fetch={fetchClassrooms}
        setOpen={(value) => setOpenAdd(value)}
      />

      <JoinClassDialog
        open={openJoin}
        accessToken={accessToken}
        fetch={fetchClassrooms}
        setOpen={(value) => setOpenJoin(value)}
      />

      <DeleteClassDialog
        open={openOut}
        accessToken={accessToken}
        fetch={fetchClassrooms}
        classroomId={choiceClass}
        setOpen={(value) => setOpenOut(value)}
      />

      <MaterialTable
        style={{ padding: '16px 32px' }}
        title={t('dashboard.classroomList')}
        columns={columns}
        data={classrooms}
        options={{ headerStyle: { fontWeight: 'bold' } }}
        actions={[
          {
            icon: 'add',
            tooltip: 'Add User',
            isFreeAction: true,
            onClick: (event) => handleOpenAdd(),
          },
          {
            icon: MeetingRoomIcon,
            tooltip: 'JoinClass',
            isFreeAction: true,
            onClick: (event) => handleOpenJoin(),
          },
        ]}
        localization={{ toolbar: { searchPlaceholder: t('dashboard.search') } }}
      />
    </div>
  );
}
