import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDebounce } from 'use-debounce';

import { Grid } from '@material-ui/core';
import { useSnackbar } from 'notistack';
import { useTranslation } from 'react-i18next';
import API from '../../apis';

import AddClassDialog from '../Dashboard/AddClass';
import ListRule from './ListRule';
import ClassDetail from './ClassDetail';

const searchClassTypes = [
  {
    label: 'name',
    value: 'name',
  },
  {
    label: 'keyword',
    value: 'keyword',
  },
];

const ClassManager = () => {
  const [searchClassType, setSearchClassType] = useState(searchClassTypes[0]);
  const [searchClassText, setSearchClassText] = useState('');
  const [classs, setClasss] = useState([]);
  const [activeClassId, setActiveClassId] = useState('');
  const [allClasss, setAllClasss] = useState([]);
  const [openAdd,setOpenAdd] = useState(false);

  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();

  const [debounceSearchClassText] = useDebounce(searchClassText, 300);
  const { classId } = useParams();
  const { accessToken } = useSelector((state) => state.auth);
  
  const handleChangeSearchClassType = (value) => {
    setSearchClassType(
      searchClassTypes.filter((type) => type.value === value)[0],
    );
  };

  const handleChangeSearchClassText = (value) => setSearchClassText(value);

  const searchClasss = (keySearch, classSearch) => {
    const type = searchClassType.value;
    setClasss(
      classSearch.filter((rule) => {
        return new RegExp(keySearch).test(rule[type]);
      }),
    );
  };

  const fetchClasss = async () => {
    const { data } = await API.classroom.getAllClassroom(accessToken)
    if (data.status === 1) {
      const { classrooms: resultClasss } = data.results;
      console.log({resultClasss});
      setAllClasss(resultClasss);
      searchClasss(debounceSearchClassText, resultClasss);
      setActiveClassId(resultClasss.length!=0?resultClasss[0].id:'');
    }
  };

  const handleClickClass = async (classId) => {
    console.log(classId);
    setActiveClassId(classId);
  };

  const handleAddClass = () => {
    setOpenAdd(true);
  };

  const handleDeleteClass = async (classroomId) => {
    const response = await API.classroom.deleteClassroom({classroomId},accessToken);
    console.log({response});
    if (response.status === 200) {
      enqueueSnackbar(response.data.message, { variant: 'success' });
      fetchClasss();
    } else {
      enqueueSnackbar(t('rulePage.deleteFail'), { variant: 'error' });
    }
  };

  useEffect(() => {
    searchClasss(debounceSearchClassText, allClasss);
  }, [debounceSearchClassText, searchClassType]);

  useEffect(() => {
    fetchClasss();
  }, []);

  return (
    
    <Grid container spacing={3}>
      <AddClassDialog
        open={openAdd}
        accessToken={accessToken}
        fetch={fetchClasss}
        setOpen={(value) => setOpenAdd(value)}
      />

      <Grid item sm={3} sx={12}>
        <ListRule
          searchRuleType={searchClassType}
          searchRuleText={searchClassText}
          searchRuleTypes={searchClassTypes}
          rules={classs}
          handleChangeSearchRuleType={handleChangeSearchClassType}
          handleChangeSearchRuleText={handleChangeSearchClassText}
          handleClickRule={handleClickClass}
          handleDeleteRule={handleDeleteClass}
          handleAddRule={handleAddClass}
        />
      </Grid>
      <Grid item sm={9} sx={12}>
        <ClassDetail
          classroomId={activeClassId}
          accessToken={accessToken}
        />
      </Grid>
    </Grid>
  );
};

export default ClassManager;
