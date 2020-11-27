import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import MaterialTable from 'material-table';
import { Delete } from '@material-ui/icons';
import { Typography, Button, Avatar, TablePagination } from '@material-ui/core';
import api from '../../apis';
import FormDialog from './AddAccount';
import useStyles from './index.style';

export default function AccountList({ accessToken }) {
  const [open, setOpen] = useState(0);
  const [accounts, setAccounts] = useState([]);
  const classes = useStyles();
  const { t } = useTranslation();
  const fetchAccounts = async () => {
    const { data } = await api.admin.getAllAccount(accessToken);
    if (data.status) {
      setAccounts(
        data.results.accounts.map((account) => ({
          ...account,
          key: account.id,
        })),
      );
    }
  };
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleDelete = async (id) => {
    const { data } = await api.admin.deleteAccount(
      { deleteAccountId: id },
      accessToken,
    );
    if (data.status) {
      fetchAccounts();
    }
  };
  useEffect(() => {
    fetchAccounts();
  }, []);

  const columns = [
    { title: t('adminPage.Name'), field: 'name' },
    {
      title: t('adminPage.Email'),
      field: 'email',
      render: (record) => (
        <div className={classes.column}>
          <Avatar src={record.avatar} className={classes.avatar}>
            {!record.avatar && record.name.slice(0, 1)}
          </Avatar>
          <Typography>{record.email}</Typography>
        </div>
      ),
    },
    {
      title: t('adminPage.Action'),
      key: 'action',
      render: (record) => (
        <Button onClick={() => handleDelete(record.id)}>
          <Delete color="error" />
        </Button>
      ),
    },
  ];

  return (
    <div>
      <FormDialog
        open={open}
        accessToken={accessToken}
        fetchAccounts={fetchAccounts}
        setOpen={(value) => setOpen(value)}
      />
      <MaterialTable
        style={{ padding: '16px 32px' }}
        title={t('adminPage.accountList')}
        columns={columns}
        data={accounts}
        options={{ headerStyle: { fontWeight: 'bold' } }}
        actions={[
          {
            icon: 'add',
            tooltip: 'Add User',
            isFreeAction: true,
            onClick: (event) => handleClickOpen(),
          },
        ]}
        localization={{ toolbar: { searchPlaceholder: t('adminPage.search') } }}
      />
    </div>
  );
}
