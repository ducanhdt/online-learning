import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  TextField,
  MenuItem,
  Select,
  List,
  Button,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  TablePagination,
} from '@material-ui/core';
import { Add, Delete } from '@material-ui/icons';
import useStyles from './index.style';

const MAX_ITEM = 10;

const ListRule = ({
  searchRuleType,
  searchRuleText,
  searchRuleTypes,
  rules,
  handleChangeSearchRuleType,
  handleChangeSearchRuleText,
  handleClickRule,
  handleDeleteRule,
  handleAddRule,
}) => {
  const [page, setPage] = useState(0);

  const classes = useStyles();
  const { t } = useTranslation();

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <>
      <TextField
        placeholder={t('rulePage.search')}
        fullWidth
        variant="outlined"
        value={searchRuleText}
        onChange={(e) => handleChangeSearchRuleText(e.target.value)}
        InputProps={{
          endAdornment: (
            <Select
              variant="standard"
              value={searchRuleType.value}
              onChange={(e) => handleChangeSearchRuleType(e.target.value)}
            >
              {searchRuleTypes.map((type) => (
                <MenuItem key={type.value} value={type.value}>
                  {t(`rulePage.${type.label}`)}
                </MenuItem>
              ))}
            </Select>
          ),
        }}
      />

      <Button
        color="primary"
        onClick={handleAddRule}
        className={classes.buttonAddRule}
        startIcon={<Add />}
        fullWidth
      >
        Create Classroom
      </Button>
      {rules.length ? (
        <List>
          {rules
            .slice(page * MAX_ITEM, page * MAX_ITEM + MAX_ITEM)
            .map((rule) => (
              <ListItem
                button
                key={rule.id}
                className={classes.ruleItem}
                onClick={() => handleClickRule(rule.id)}
              >
                <ListItemText primary={rule.name} />
                <ListItemSecondaryAction>
                  <IconButton
                    edge="end"
                    onClick={() => handleDeleteRule(rule.id)}
                  >
                    <Delete />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          {rules.length > MAX_ITEM && (
            <TablePagination
              rowsPerPageOptions={[]}
              component="div"
              count={rules.length}
              rowsPerPage={MAX_ITEM}
              page={page}
              onChangePage={handleChangePage}
            />
          )}
        </List>
      ) : (
        <div />
      )}
    </>
  );
};

export default ListRule;
