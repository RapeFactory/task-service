import React, { Component } from 'react';
import Task from './Task';
import { Paper, Switch, FormControlLabel } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import moment from 'moment';
import 'moment/locale/ru';
moment.locale('ru');

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto'
  },
  table: {
    minWidth: 700
  }
});

class TaskList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tasks: [],
      show: true
    };
  }

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

  static getDerivedStateFromProps(props) {
    const { tasks: _tasks, groups } = props;
    const tasks = _tasks.map(task => {
      task.group = groups.find(group => group.id === task.group_id).name;
      task.checked = task.upload_date ? true : false;
      return task;
    });

    return {
      tasks: tasks.sort((a, b) => b.id - a.id)
    };
  }

  render() {
    const { classes } = this.props;
    const { tasks, show } = this.state;
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
              <TableCell>Комментарий</TableCell>
              <TableCell>ДатаСоздания</TableCell>
              <TableCell>ДатаОбновления</TableCell>
              <TableCell>Элементы</TableCell>
              <TableCell>Справочник</TableCell>
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
          </TableBody>
        </Table>
      </Paper>
    );
  }
}

export default withStyles(styles)(TaskList);
