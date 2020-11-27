import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Divider,
  Button,
  Grid,
  TextField,
  Card,
  CardHeader,
  Chip,
  CardContent,
} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import ChipInput from 'material-ui-chip-input';
import { useSnackbar } from 'notistack';
import API from '../../../apis';
import useStyles from './index.style';

const allActions = [
  { id: 'action 1', name: 'action 1' },
  { id: 'action 2', name: 'action 2' },
  { id: 'action 3', name: 'action 3' },
];
const RuleDetail = ({ activeRuleId, botId, accessToken, fetchRules }) => {
  const [rule, setRule] = useState({
    id: '',
    name: '',
    keyword: [],
    botId,
    actions: [],
  });
  const classes = useStyles();
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();

  const fetchRule = async () => {
    // Dựa vào activeRuleId để gọi api lấy thông tin của rule
    // Giả sử lấy được thông tin defaultRule
    if (activeRuleId !== '') {
      const response = await API.classroom.getClassroom(
        { classroomId: activeRuleId },
        accessToken,
      );
      if (response.status === 200) {
        console.log(response.data);
        // const { id, name, keyword, actions } = response.data.result;
        // setRule({ id, name, keyword, actions, botId });
      }
    } else
      setRule({
        id: '',
        name: '',
        keyword: [],
        botId,
        actions: [],
      });
  };
  const handleChangename = (e) => {
    setRule({ ...rule, name: e.target.value });
  };
  const handleDeleteChip = (chip, index) => {
    const { keyword } = rule;
    const newKeyword = [
      ...keyword.slice(0, index),
      ...keyword.slice(index + 1, keyword.length),
    ];
    setRule({ ...rule, keyword: newKeyword });
  };
  const handleAddChip = (chip) => {
    rule.keyword.push(chip);
  };
  const handleSubmit = async () => {
    if (rule.id === '') {
      const response = await API.rule.createRule({ ...rule }, accessToken);
      if (response.status === 200) {
        enqueueSnackbar(t('rulePage.addRuleSuccess'), { variant: 'success' });
        fetchRules();
      } else {
        enqueueSnackbar(t('rulePage.addRuleFail'), { variant: 'error' });
        fetchRules();
      }
    } else {
      const response = await API.rule.updateRule(
        { ...rule, ruleId: rule.id },
        accessToken,
      );
      if (response.status === 200) {
        enqueueSnackbar(t('rulePage.updateRuleSuccess'), {
          variant: 'success',
        });
      } else {
        enqueueSnackbar(t('rulePage.updateRuleFail'), { variant: 'error' });
      }
    }
  };
  useEffect(() => {
    fetchRule();
  }, [activeRuleId]);
  return (
    <form autoComplete="off" noValidate>
      <Card className={classes.card}>
        <CardHeader
          title={
            // eslint-disable-next-line react/jsx-wrap-multilines
            <TextField
              fullWidth
              value={rule.name}
              onChange={handleChangename}
              placeholder={t('rulePage.ruleName')}
            />
          }
          action={
            // eslint-disable-next-line react/jsx-wrap-multilines
            <Button color="primary" variant="contained" onClick={handleSubmit}>
              {rule.id === ''
                ? t('rulePage.addRule')
                : t('rulePage.changeRule')}
            </Button>
          }
        />
        <Divider />
        <CardContent>
          <Grid
            container
            spacing={3}
            direction="column"
            justify="flex-start"
            alignItems="stretch"
          >
            <Grid item>
              <ChipInput
                // className={classes.innerCard}
                fullWidth
                label={t('rulePage.keyword')}
                placeholder={t('rulePage.addKeywordHere')}
                value={rule.keyword}
                onAdd={(chip) => handleAddChip(chip)}
                onDelete={(chip, index) => handleDeleteChip(chip, index)}
                chipRenderer={({ handleDelete, value }) => (
                  <Chip
                    className={classes.chip}
                    key={value}
                    size="medium"
                    label={value}
                    onDelete={handleDelete}
                    color="primary"
                  />
                )}
              />
            </Grid>
            <Grid item>
              <Autocomplete
                // className={classes.innerCard}
                multiple
                id="tags-standard"
                options={allActions}
                getOptionLabel={(option) => option.name}
                value={rule.actions}
                onChange={(e, value) => {
                  setRule({ ...rule, actions: value });
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="standard"
                    label={t('rulePage.actions')}
                    placeholder={t('rulePage.addActionsHere')}
                  />
                )}
                renderTags={(value, getTagProps) =>
                  value.map((option, index) => (
                    <Chip
                      className={classes.chip}
                      label={option.name}
                      size="standard"
                      color="primary"
                      {...getTagProps({ index })}
                    />
                  ))
                }
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </form>
  );
};

export default RuleDetail;
