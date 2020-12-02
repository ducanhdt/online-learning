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
import RuleDetail from './RuleDetail';

const searchRuleTypes = [
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
  const [searchRuleType, setSearchRuleType] = useState(searchRuleTypes[0]);
  const [searchRuleText, setSearchRuleText] = useState('');
  const [rules, setRules] = useState([]);
  const [activeRuleId, setActiveRuleId] = useState('');
  const [allRules, setAllRules] = useState([]);
  const [openAdd,setOpenAdd] = useState(false);

  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();

  const [debounceSearchRuleText] = useDebounce(searchRuleText, 300);
  const { classId } = useParams();
  const { accessToken } = useSelector((state) => state.auth);

  const handleChangeSearchRuleType = (value) => {
    setSearchRuleType(
      searchRuleTypes.filter((type) => type.value === value)[0],
    );
  };

  const handleChangeSearchRuleText = (value) => setSearchRuleText(value);

  const searchRules = (keySearch, ruleSearch) => {
    const type = searchRuleType.value;
    setRules(
      ruleSearch.filter((rule) => {
        return new RegExp(keySearch).test(rule[type]);
      }),
    );
  };

  const fetchRules = async () => {
    const { data } = await API.classroom.getAllClassroom(accessToken)
    if (data.status === 1) {
      const { classrooms: resultRules } = data.results;
      setAllRules(resultRules);
      searchRules(debounceSearchRuleText, resultRules);
      setActiveRuleId('');
    }
  };

  const handleClickRule = async (ruleId) => {
    console.log(ruleId);
    setActiveRuleId(ruleId);
  };

  const handleAddRule = () => {
    setOpenAdd(true);
  };

  const handleDeleteRule = async (classroomId) => {
    const response = await API.classroom.deleteClassroom({classroomId},accessToken);
    console.log({response});
    if (response.status === 200) {
      enqueueSnackbar(response.data.message, { variant: 'success' });
      fetchRules();
    } else {
      enqueueSnackbar(t('rulePage.deleteFail'), { variant: 'error' });
    }
  };

  useEffect(() => {
    searchRules(debounceSearchRuleText, allRules);
  }, [debounceSearchRuleText, searchRuleType]);

  useEffect(() => {
    fetchRules();
  }, []);

  return (
    
    <Grid container spacing={3}>
      <AddClassDialog
        open={openAdd}
        accessToken={accessToken}
        fetch={fetchRules}
        setOpen={(value) => setOpenAdd(value)}
      />

      <Grid item sm={4} sx={12}>
        <ListRule
          searchRuleType={searchRuleType}
          searchRuleText={searchRuleText}
          searchRuleTypes={searchRuleTypes}
          rules={rules}
          handleChangeSearchRuleType={handleChangeSearchRuleType}
          handleChangeSearchRuleText={handleChangeSearchRuleText}
          handleClickRule={handleClickRule}
          handleDeleteRule={handleDeleteRule}
          handleAddRule={handleAddRule}
        />
      </Grid>
      <Grid item sm={8} sx={12}>
        <RuleDetail
          activeRuleId={activeRuleId}
          accessToken={accessToken}
          botId={classId}
          fetchRules={fetchRules}
        />
      </Grid>
    </Grid>
  );
};

export default ClassManager;
