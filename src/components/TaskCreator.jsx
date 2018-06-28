import React, { Component } from 'react';
import { Paper, Button, Select, MenuItem, TextField } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Items from './Items';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  input: {
    margin: theme.spacing.unit,
    width: '300px',
    textAlign: 'left'
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120
  }
});

class TaskCreator extends Component {
  state = {
    select: 1,
    taskName: '',
    comment: '',
    item: '',
    items: []
  };

  onSelect = e => {
    this.setState({ select: e.target.value });
  };

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onAdd = e => {
    this.setState({
      items: [...this.state.items, this.state.item],
      item: ''
    });
  };

  onDelete = (i, e) => {
    this.state.items.splice(i, 1);
    this.setState({ items: this.state.items });
  };

  onEnter = e => {
    if (e.key === 'Enter') {
      e.preventDefault();
      this.onAdd();
    }
  };

  sendCreate = e => {
    e.preventDefault();
    this.props.create(e, this.state.items);
    this.setState({
      select: 1,
      taskName: '',
      comment: '',
      item: '',
      items: []
    });
  };

  render() {
    const { select, taskName, comment, items, item } = this.state;
    const { classes, groups } = this.props;
    return (
      <Paper className={classes.container}>
        <form onSubmit={this.sendCreate}>
          <h3>Создание задачи</h3>
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
          <Select id="group_id" value={select} className={classes.input} onChange={this.onSelect}>
            {groups.map(group => (
              <MenuItem value={group.id} key={group.id}>
                {group.name}
              </MenuItem>
            ))}
          </Select>
          <Items
            onChange={this.onChange}
            onAdd={this.onAdd}
            items={items}
            item={item}
            onDelete={this.onDelete}
            onEnter={this.onEnter}
          />
          <Button
            type="submit"
            className={classes.input}
            children={'Добавить задачу'}
            color="secondary"
            variant="outlined"
          />
        </form>
      </Paper>
    );
  }
}

export default withStyles(styles)(TaskCreator);
