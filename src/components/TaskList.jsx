import React, { Component } from 'react';
import Task from './Task';
import { Paper, Switch, FormControlLabel } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import moment from 'moment';
import 'moment/locale/ru';
moment.locale('ru');

const actionsStyles = theme => ({
  root: {
    flexShrink: 0,
    color: theme.palette.text.secondary,
    marginLeft: theme.spacing.unit * 2.5
  }
});

class TablePaginationActions extends React.Component {
  handleFirstPageButtonClick = event => {
    this.props.onChangePage(event, 0);
  };

  handleBackButtonClick = event => {
    this.props.onChangePage(event, this.props.page - 1);
  };

  handleNextButtonClick = event => {
    this.props.onChangePage(event, this.props.page + 1);
  };

  handleLastPageButtonClick = event => {
    this.props.onChangePage(event, Math.max(0, Math.ceil(this.props.count / this.props.rowsPerPage) - 1));
  };

  render() {
    const { classes, count, page, rowsPerPage, theme } = this.props;

    return (
      <div className={classes.root}>
        <IconButton onClick={this.handleFirstPageButtonClick} disabled={page === 0} aria-label="First Page">
          {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
        </IconButton>
        <IconButton onClick={this.handleBackButtonClick} disabled={page === 0} aria-label="Previous Page">
          {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
        </IconButton>
        <IconButton
          onClick={this.handleNextButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="Next Page"
        >
          {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
        </IconButton>
        <IconButton
          onClick={this.handleLastPageButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="Last Page"
        >
          {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
        </IconButton>
      </div>
    );
  }
}

const TablePaginationActionsWrapped = withStyles(actionsStyles, { withTheme: true })(TablePaginationActions);

const styles = theme => ({
  root: {
    width: '100%',
    overflowX: 'auto'
  },
  table: {
    minWidth: 700
  }
});

class TaskList extends Component {
  state = {
    tasks: [],
    show: true,
    page: 0,
    rowsPerPage: 5
  };

  onCheck = id => e => {
    e.target.checked && this.changeCheck(id);
  };

  changeCheck = id => {
    const tasks = this.state.tasks.map(task => {
      task.checked = task.id === id;
      return task;
    });
    this.setState({
      tasks
    });
    this.props.updateTask(id);
  };

  changeSwitch = e => {
    console.log(e.target.checked);
    this.setState({
      show: e.target.checked
    });
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  static getDerivedStateFromProps(props) {
    const { tasks: _tasks, groups, items } = props;
    const tasks = _tasks.map(task => {
      task.group = groups.find(group => group.id === task.group_id).name;
      task.items = items.filter(item => item.task_id === task.id).map(item => item.name).join(' ✌ ');
      task.checked = task.upload_date ? true : false;
      return task;
    });

    return {
      tasks: tasks.sort((a, b) => b.id - a.id)
    };
  }

  render() {
    const { classes } = this.props;
    const { tasks, show, rowsPerPage, page } = this.state;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, tasks.length - page * rowsPerPage);

    return (
      <Paper className={classes.root}>
        <h3>Список задач</h3>
        <FormControlLabel
          control={<Switch checked={show} onChange={this.changeSwitch} />}
          label="Показать отмеченные"
        />
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>Cheked</TableCell>
              <TableCell>Название</TableCell>
              <TableCell>Элементы</TableCell>
              <TableCell>Справочник</TableCell>
              <TableCell>Комментарий</TableCell>
              <TableCell>ДатаСоздания</TableCell>
              <TableCell>ДатаОбновления</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tasks
              .filter(task => {
                if (!show) {
                  return !task.checked;
                }
                return true;
              })
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map(task => (
                <Task
                  checked={task.checked}
                  onCheck={this.onCheck(task.id)}
                  key={task.id}
                  taskName={task.name}
                  taskComment={task.comment}
                  taskCreateDate={moment(task.create_date).calendar()}
                  taskUploadDate={moment(task.upload_date).calendar()}
                  taskItems={task.items}
                  taskGroup={task.group}
                />
              ))}
            {emptyRows > 0 && (
              <TableRow style={{ height: 57 * emptyRows }}>
                <TableCell />
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                count={tasks.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={this.handleChangePage}
                onChangeRowsPerPage={this.handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActionsWrapped}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </Paper>
    );
  }
}

export default withStyles(styles)(TaskList);
