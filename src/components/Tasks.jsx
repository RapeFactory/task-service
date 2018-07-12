import React, { Component, Fragment } from 'react';
import TaskList from './TaskList';
import TaskCreator from './TaskCreator';
import Contacts from './Contacts'
import { CircularProgress } from '@material-ui/core';
import moment from 'moment';

const url = window.location.href;
class Tasks extends Component {
  state = {
    tasks: null,
    groups: null,
    items: null
  };

  fetchGroups = () => {
    fetch(`${url}groups`, {
      method: 'GET'
    })
      .then(res => res.json())
      .then(json => this.setState({ groups: json.data }))
      .catch(error => console.error(error));
  };

  fetchItems = () => {
    fetch(`${url}items`, {
      method: 'GET'
    })
      .then(res => res.json())
      .then(json => this.setState({ items: json.data }))
      .catch(error => console.error(error));
  };

  fetchTasks = () => {
    fetch(`${url}tasks`, {
      method: 'GET'
    })
      .then(res => res.json())
      .then(json => this.setState({ tasks: json.data }))
      .catch(error => console.error(error));
  };

  updateTask = id => {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    const body = {
      task_id: id,
      task: {
        upload_date: moment()
          .format()
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

  create = (e, items) => {
    const postItems = (task_id, items) => {
      return items.map(name => {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');

        const body = {
          item: {
            name,
            task_id
          }
        };

        return fetch(`${url}item`, {
          method: 'POST',
          headers,
          body: JSON.stringify(body)
        })
          .then(res => res.json())
          .catch(error => console.error(error));
      });
    };

    const { taskName, comment, group_id } = e.target;

    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    const body = {
      task: {
        create_date: moment()
          .format()
          .substring(0, 19)
          .replace('T', ' '),
        name: taskName.value,
        comment: comment.value,
        group_id: group_id.value
      }
    };

    taskName.value &&
      fetch(`${url}task`, {
        method: 'POST',
        headers,
        body: JSON.stringify(body)
      })
        .then(res => res.json())
        .then(json => {
          console.log(`task ${json.data.insertId} is Created \n`, json);
          return json.data.insertId;
        })
        .then(task_id => postItems(task_id, items))
        .then(x => Promise.all(x))
        .then(this.fetchTasks)
        .then(this.fetchItems)
        .catch(error => console.error(error));
  };

  componentDidMount() {
    this.fetchTasks();
    this.fetchGroups();
    this.fetchItems();
  }

  render() {
    const { tasks, groups, items } = this.state;
    return (
      <Fragment>
        {groups && <TaskCreator groups={groups} create={this.create} />}
        {tasks && groups && items ? <TaskList {...this.state} updateTask={this.updateTask} /> : <CircularProgress />}
        <Contacts />
      </Fragment>
    );
  }
}

export default Tasks;
