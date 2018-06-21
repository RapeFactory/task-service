import React, { Component } from 'react';
import TaskList from './TaskList';
import TaskCreator from './TaskCreator';
import { CircularProgress } from '@material-ui/core';
import moment from 'moment';

const url = 'http://it4.ecookna.ru:8080/';
class Tasks extends Component {
  constructor(props) {
    super(props);

    this.fetchTasks = this.fetchTasks.bind(this);
    this.fetchTasks();

    this.fetchGroups = this.fetchGroups.bind(this);
    this.fetchGroups();

    this.state = {
      tasks: [],
      groups: []
    };
  }

  fetchGroups() {
    fetch(`${url}groups`, {
      method: 'GET'
    })
      .then(res => res.json())
      .then(json => this.setState({ groups: json.data }))
      .catch(error => console.error(error));
  }

  fetchTasks() {
    fetch(`${url}tasks`, {
      method: 'GET'
    })
      .then(res => res.json())
      .then(json => this.setState({ tasks: json.data }))
      .catch(error => console.error(error));
  }

  updateTask = id => {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    const body = {
      task_id: id,
      task: {
        upload_date: moment().format()
        .substring(0, 19)
        .replace('T', ' ')
      }
    };

    fetch(`${url}task`, {
      method: 'PUT',
      headers,
      body: JSON.stringify(body)
    })
      .then(res => res.json())
      .then(json => console.log(`task ${id} is updated \n`, json))
      .then(this.fetchTasks)
      .catch(error => console.error(error));
  };

  create = e => {
    e.preventDefault();
    const { taskName, comment, items, group_id } = e.target;

    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    const body = {
      task: {
        create_date: moment().format()
          .substring(0, 19)
          .replace('T', ' '),
        name: taskName.value,
        comment: comment.value,
        items: items.value,
        group_id: group_id.value
      }
    };

    taskName.value &&
      items.value &&
      fetch(`${url}task`, {
        method: 'POST',
        headers,
        body: JSON.stringify(body)
      })
        .then(res => res.json())
        .then(json => console.log(`task ${json.id} is Created \n`, json))
        .then(this.fetchTasks)
        .catch(error => console.error(error));
  };

  render() {
    const { tasks, groups } = this.state;
    return (
      <div>
        <h2>Задачи</h2>
        <TaskCreator groups={groups} create={this.create} />
        {tasks.length && groups.length ? (
          <TaskList tasks={tasks} groups={groups} updateTask={this.updateTask} />
        ) : (
          <CircularProgress />
        )}
      </div>
    );
  }
}

export default Tasks;
