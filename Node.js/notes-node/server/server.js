const express = require('express');
const _ = require('lodash');
const bodyParser = require('body-parser');
const mongoose = require('./db/mongoose');

const User = require('./models/user');
const Todo = require('./models/todo.js');
const authenticate = require('./middleware/authenticate');

const app = express();
const port = process.env.PORT;
app.use(bodyParser.json());

errStatus = (err) => {
  res.status(400).send(err);
}

app.post('/todos', authenticate, (req, res) => {
  var todo = new Todo({
    text: req.body.text,
    _creator: req.user._id
  })

  todo.save().then(doc => {
    res.send(doc);
  }).catch(err => {
    errStatus(err);
  });
});
app.get('/todos', authenticate, (req, res) => {
  Todo.find({
    _creator: req.user._id
  }).then(todos => {
    res.send({
      todos
    });
  }).catch(err => {
    errStatus(err);
  });
});

app.get('/todos/:id', (req, res) => {
  const id = req.params.id;

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }
  res.send({
    todo
  });
}).catch(err => {
  errStatus(err);
})


app.delete('/todos/:id', (req, res) => {
  const id = req.params.id;

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }
  Todo.findByIdAndRemove(id).then(todo => {
    res.send({
      todo
    });
  }).catch(err => {
    errStatus(err);
  })
});



app.patch('/todos/:id', (req, res) => {
  var id = req.params.id;
  var body = _.pick(req.body, ['text', 'completed']);
  if (!ObjectId.isValid(id)) {
    return errStatus(err);
  }
  if (_.isBoolean(body.completed) && body.completed) {
    body.completedAt = new Date().getTime();
  } else {
    body.completed = false;
    body.completedAt = null;
  }

  Todo.findByIdAndUpdate(id, {
    $set: body
  }, {
    new: true
  }).then(todo => {
    if (!todo) {
      return errStatus(err);
    }
    res.send({
      todo
    });
  }).catch(err => {
    errStatus(err);
  })
})

//Post /users
app.post('/users', (req, res) => {
  var body = _.pick(req.body, ['email', 'password']);
  var user = new User(body);

  user.save().then(() => {
    return user.generateAuthToken()
  }).then((token) => {
    res.header('x-auth', token).send(user);
  }).catch(err => {
    errStatus(err);
  })
});

app.post('/users/login', (req, res) => {
  const body = _.pick(req.body, ['email', 'password']);

  User.findByCredentials(body.email, body.password).then(user => {
    return user.generateAuthToken().then(token => {
      res.header('x-auth', token).send(user);
    });
  }).catch(err => {
    errStatus(err);
  });
});

app.listen(port, () => {
  console.log(`Started up at port ${port}`);
});