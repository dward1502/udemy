import React from 'react';

import Card from '../UI/Card';
import classes from './UsersList.module.css'

function UsersList(props) {
  return (
    <Card classes={classes.users}>
      <ul>
        {props.users.map((user, i) => (
          <li key={i}>
            {user.name} ({user.age} years old)
          </li>
        ))}
      </ul>
    </Card>
  );
}

export default UsersList;
