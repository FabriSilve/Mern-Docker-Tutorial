import axios from 'axios';

export default class TodoService {

  all(callback) {
    axios.get('http://localhost:6200/todo')
      .then( (response) => callback(response.data) )
      .catch( (err) => {
        console.log(err);
        callback(null);
      });
  }

  get(id, callback) {
    axios.get('http://localhost:6200/todo/'+id)
      .then( (response) => callback(response.data) )
      .catch( (error) => {
        console.log(error);
        callback(null);
      });
  }

  add(data, callback) {
    axios.post('http://localhost:6200/todo/add/', { desc: data })
      .then( (response) => {
        console.log(response);
        callback();
      })
      .catch( (error) => {
        console.log(error);
        callback();
      });
  }

  update(data, id, callback) {
    axios.post('http://localhost:6200/todo/update/'+id, { desc: data })
      .then( (response) => {
        console.log('Updated');
        callback();
      })
      .catch( response => { console.error('No Updating'); callback(); } );
  }

  delete(id, callback) {
    axios.get('http://localhost:6200/todo/delete/'+id)
      .then( response => callback() )
      .catch( response => {
        console.log('Error deleting');
        callback();
      });
  }
}
