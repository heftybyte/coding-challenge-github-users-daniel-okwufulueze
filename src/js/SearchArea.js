import React from 'react';
require('../css/search-area.css')

function SearchArea (props) {
  return (
    <div className='search-area'>
      <input id='users' type='text' onKeyUp={props.onKeyUp()} placeholder='Enter comma separated user names to see their number of repositories' />
      <input type='button' value='Search' id='search' onClick={props.onSearchClick()} />
    </div>
  )
}

export default SearchArea
