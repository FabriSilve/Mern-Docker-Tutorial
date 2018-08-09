import React, {Component} from 'react';
import axios from 'axios';
import TodoService from './TodoService';

export default class UpdateTodo extends Component {
  constructor(props){
    super(props);
    this.todoService = new TodoService();
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCancel= this.handleCancel.bind(this);
    this.state = {
      _id: '',
      desc: ''
    };
  }

  componentDidMount(){
    let id = this.props.match.params.id;
    var thisRef = this;
    this.todoService.get(id, (data) => this.setState(data) );
  }

  handleChange(event) {
    this.setState({desc: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    var thisRef = this;
    this.todoService.update(
      this.state.desc,
      this.state._id,
      () => thisRef.props.history.push('/')
    );
  }

  handleCancel(event) {
    event.preventDefault();
    this.props.history.push('/');
  }

  render() {
    return (
      <div className="container">
        <form onSubmit={this.handleSubmit}>
          <div className="panel panel-default">
            <div className="panel-heading">Edit Task</div>
            <div className="panel-body">
            <p>Task description</p>
              <input type="hidden" value={this.state._id} />
                  <input type="text" value={this.state.desc} onChange={this.handleChange}  className="form-control"/>
            </div>
            <div className="panel-footer">
            <button type="submit" className="btn btn-primary">Update</button>
            <button type="button" className="btn btn-default" onClick={this.handleCancel}>Cancel</button>
            </div>
          </div>
        </form>
      </div>
    );
  }

}
