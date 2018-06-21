import React, { Component } from 'react';
import { TableRow, TableCell, Checkbox } from '@material-ui/core';

class Task extends Component {
  render() {
    const { taskName, taskComment, taskCreateDate, taskUploadDate, taskItems, taskGroup, onCheck, checked } = this.props;
    return (
      <TableRow>
        <TableCell><Checkbox checked={checked} onChange={onCheck}/></TableCell>
        <TableCell component="th" scope="row">{taskName}</TableCell>
        <TableCell>{taskComment}</TableCell>
        <TableCell>{taskCreateDate}</TableCell>
        <TableCell>{taskUploadDate}</TableCell>
        <TableCell>{taskItems}</TableCell>
        <TableCell>{taskGroup}</TableCell>
      </TableRow>
    );
  }
}

export default Task;
