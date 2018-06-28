import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import { Button, TextField } from '@material-ui/core';

const styles = theme => ({
  demo: {
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    flexWrap: 'wrap'
  },
  button: {
    margin: theme.spacing.unit,
    width: '35px',
    height: '30px'
  },
  input: {
    margin: theme.spacing.unit,
    width: '240px'
  },
});

class Items extends React.Component {
  render() {
    const { classes, items, item, onAdd, onChange, onDelete, onEnter } = this.props;

    return (
      <div className={classes.demo}>
        <TextField
          onChange={onChange}
          onKeyDown={onEnter}
          id="item"
          value={item}
          placeholder="Элементы"
          className={classes.input}
        />
        <Button onClick={onAdd} variant="fab" color="secondary" aria-label="add" className={classes.button}>
          <AddIcon />
        </Button>
        <List>
          {items.map((item, i) =>
            <ListItem dense key={i}>
              <ListItemText primary={item}/>
              <ListItemSecondaryAction >
                <IconButton value={i} aria-label="Delete" onClick={e => onDelete(i, e)}>
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          )}
        </List>
      </div>
    );
  }
}

export default withStyles(styles)(Items);
