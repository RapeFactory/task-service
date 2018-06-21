import React, { Component } from 'react';
import { TableRow, TableCell, Checkbox } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  cell: {
    fontSize: '1.1em'
  }
});

class Task extends Component {
  render() {
    const {
      classes,
      taskName,
      taskComment,
      taskCreateDate,
      taskUploadDate,
      taskItems,
      taskGroup,
      onCheck,
      checked
    } = this.props;
    return (
      <TableRow>
        <TableCell className={classes.cell}>
          <Checkbox checked={checked} onChange={onCheck} />
        </TableCell>
        <TableCell className={classes.cell} component="th" scope="row">
          {taskName}
        </TableCell>
        <TableCell className={classes.cell}>{taskItems}</TableCell>
        <TableCell className={classes.cell}>{taskGroup}</TableCell>
        <TableCell className={classes.cell}>{taskComment}</TableCell>
        <TableCell className={classes.cell}>{taskCreateDate}</TableCell>
        <TableCell className={classes.cell}>{taskUploadDate}</TableCell>
      </TableRow>
    );
  }
}

export default withStyles(styles)(Task);
