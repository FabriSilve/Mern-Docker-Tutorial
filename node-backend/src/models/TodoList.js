var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TodoList = new Schema({
  desc: {
    type: String
  },
}, {
  collection: 'Task'
});

module.exports = mongoose.model('TodoList', TodoList);
