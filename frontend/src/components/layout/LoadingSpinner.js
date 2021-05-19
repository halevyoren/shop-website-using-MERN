import React from 'react';
import Spinner from '../../images/Loading Spinner.gif';
const LoadingSpinner = () => {
  return (
    <div className='loading-spinner'>
      <img src={Spinner} alt='Loading...' />
    </div>
  );
};

export default LoadingSpinner;
