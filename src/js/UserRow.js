import React from 'react';
require('../css/user-row.css')

function UserRow (props) {
  return (
    <div className='user-row'>
      <div className='user-name'>{props.data.login || props.data.originalSearchTerm}</div>
      <div className='number-of-repo'>{props.data.public_repos || 'No Data Found'}</div>
    </div>
  )
}

export default UserRow
