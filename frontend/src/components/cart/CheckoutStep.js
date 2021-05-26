import React from 'react';
import { Link } from 'react-router-dom';

export const ActiveStep = ({ toAdress, text }) => {
  return (
    <div className='step-col px-1'>
      <Link to={`/${toAdress}`} className='float-right'>
        <div className='left-arrow-side'></div>
        <div className='arrow-middle'>{`${text}`}</div>
        <div className='right-arrow-side'></div>
      </Link>
    </div>
  );
};

export const IncompleteStep = ({ text }) => {
  return (
    <div className='step-col px-1'>
      <Link
        to='/'
        onClick={(e) => {
          e.preventDefault();
        }}
      >
        <div className='left-arrow-side left-arrow-incomplete'></div>
        <div className='arrow-middle incomplete'>{`${text}`}</div>
        <div className='right-arrow-side right-arrow-incomplete'></div>
      </Link>
    </div>
  );
};
