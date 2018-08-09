var express = require('express');
var app = express();
var router = express.Router();

var TodoList = require('../models/TodoList');

router.route('/:id').get( (req, res) => {
  var id = req.params.id;
  TodoList.findById(id, (err, item) => {
    res.json(item);
  });
});

router.route('/').get( (req, res) => {
  TodoList.find( (err, items) => {
    if(err) console.log(err);
    else res.json(items);
  });
});

router.route('/add').post( (req, res) => {
  var item = new TodoList(req.body);
  item.save()
    .then( item => {
      res.json('Added');
    })
    .catch( err => {
      res.status(400).send("unable to save to database");
    });
});

router.route('/update/:id').post( (req, res) => {
  TodoList.findById(req.params.id, (err, item) => {
    if (!item)  return next(new Error('Could not load Document'));
    else {
      item.desc = req.body.desc;

      item.save().then(item => {
          res.json('Updated');
      })
      .catch(err => {
            res.status(400).send("unable to update the database");
      });
    }
  });
});


router.route('/delete/:id').get( (req, res) => {
  TodoList.findByIdAndRemove( { _id: req.params.id }, (err, item) => {
    if(err) res.json(err);
    else res.json('Deleted');
  });
});



module.exports = router;
