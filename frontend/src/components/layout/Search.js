import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa';

const Search = ({ history }) => {
  const [keyword, setKeyword] = useState('');
  const searchHandler = (e) => {
    e.preventDefault();

    if (keyword.trim()) {
      history.push(`/search/${keyword}`);
    } else {
      history.push(`/`);
    }
  };
  return (
    <Form onSubmit={searchHandler}>
      <div className='input-group m-auto p-2'>
        <input
          type='text'
          id='search_field'
          className='form-control'
          placeholder='Enter Product Name ...'
          onChange={(e) => setKeyword(e.target.value)}
        />
        <div className='input-group-append'>
          <Button
            variant='outline-info'
            className='search_btn border-0'
            onClick={searchHandler}
          >
            <FaSearch size='1.3rem' />
          </Button>
        </div>
      </div>
    </Form>
  );
};

export default Search;
