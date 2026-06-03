import React from 'react';

export function ButtonExample({variant='primary', size='medium', children}){
  return (
    <button className={`btn btn-${variant} btn-${size}`}>{children}</button>
  );
}

export default ButtonExample;
