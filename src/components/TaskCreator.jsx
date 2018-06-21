import React, { Component } from 'react';
import { Paper, Button, Select, MenuItem, TextField } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  input: {
    margin: theme.spacing.unit,
    width: '300px'
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120
  }
});

class TaskCreator extends Component {
  constructor(props) {
    super(props);

    this.state = {
      select: 1,
      taskName: '',
      comment: '',
      items: ''
    };
  }

  onSelect = e => {
    this.setState({ select: e.target.value });
  };

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  sendCreate = e => {
    this.props.create(e);
    this.setState({
      select: 1,
      taskName: '',
      comment: '',
      items: ''
    });
  }

  render() {
    const { select, taskName, comment, items } = this.state;
    const { classes, groups } = this.props;
    return (
      <Paper className={classes.container}>
        <form onSubmit={this.sendCreate}>
          <TextField
            onChange={this.onChange}
            id="taskName"
            value={taskName}
            placeholder="Название"
            className={classes.input}
          />
          <TextField
            onChange={this.onChange}
            id="comment"
            value={comment}
            multiline
            placeholder="Комментарий"
            className={classes.input}
          />
          <TextField
            onChange={this.onChange}
            id="items"
            value={items}
            multiline
            placeholder="Элементы"
            className={classes.input}
          />
          <Select
            id="group_id"
            value={select}
            className={classes.input}
            onChange={this.onSelect}
          >
            {groups.map(group => (
              <MenuItem value={group.id} key={group.id}>
                <em>{group.name}</em>
              </MenuItem>
            ))}
          </Select>
          <Button type="submit" className={classes.input} children={'Добавить задачу'} />
        </form>
      </Paper>
    );
  }
}

export default withStyles(styles)(TaskCreator);
