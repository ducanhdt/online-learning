import React, { useState, useEffect } from 'react';
import download from 'downloadjs';
import axios from 'axios';
import MaterialTable from 'material-table';
import { Button } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import useStyles from './index.style';
import AddClassDialog from './File';

const FilesList = ({ classId }) => {
  const [openAdd, setOpenAdd] = useState(false);
  const [filesList, setFilesList] = useState([]);
  const [errorMsg, setErrorMsg] = useState('');
  //const [files, setFiles] = useState([]);
  const { t } = useTranslation();
  const classes = useStyles();
  useEffect(() => {
    const getFilesList = async () => {
      try {
        const formData = new FormData();
        formData.append('classroomId', classId);
        //console.log(classId);
        const { data } = await axios.get(
          `${process.env.REACT_APP_API_DOMAIN}/api/v1/getAllFiles/${classId}`,
        );

        setErrorMsg('');

        setFilesList(
          data.result.map((file) => ({
            ...file,
            key: file.id,
          })),
        );
        //console.log(filesList);
      } catch (error) {
        error.response && setErrorMsg(error.response.data);
      }
    };

    getFilesList();
  }, [openAdd]);

  const handleOpenAdd = () => {
    setOpenAdd(true);
  };

  const downloadFile = async (id, path, mimetype) => {
    try {
      //console.log(id);
      const result = await axios.get(
        `${process.env.REACT_APP_API_DOMAIN}/api/v1/download/${id}`,
        {
          responseType: 'blob',
        },
      );
      const split = path.split('/');
      const filename = split[split.length - 1];
      setErrorMsg('');
      return download(result.data, filename, mimetype);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setErrorMsg('Error while downloading file. Try again later');
      }
    }
  };

  const columns = [
    {
      title: 'Title',
      field: 'title',
    },
    { title: t('dashboard.description'), field: 'description' },
    {
      title: t('dashboard.action'),
      key: 'action',
      render: (record) => (
        <div>
          <Button
            onClick={() =>
              downloadFile(record.id, record.file_path, record.file_mimetype)
            }
          >
            Download
          </Button>
        </div>
      ),
    },
  ];

  return (

    <div>
      <AddClassDialog
        open={openAdd}
        classId={classId}
        //accessToken={accessToken}
        //fetch={fetchClassrooms}
        setOpen={(value) => setOpenAdd(value)}
      />
      <MaterialTable
        style={{ padding: '16px 32px' }}
        title={'FileList'}
        columns={columns}
        data={filesList}
        options={{ headerStyle: { fontWeight: 'bold' } }}
        actions={[
          {
            icon: 'add',
            tooltip: 'Add File',
            isFreeAction: true,
            onClick: (event) => handleOpenAdd(),
          },
        ]}
        localization={{ toolbar: { searchPlaceholder: t('dashboard.search') } }}
      />
    </div>
  );
};

export default FilesList;
