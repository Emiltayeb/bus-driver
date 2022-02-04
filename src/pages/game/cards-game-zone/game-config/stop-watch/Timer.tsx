import React from 'react';

const Timer = (props: any) => {
 return (
  <div className="timer">
   <span className="digits w-1">
    {('0' + Math.floor((props.time / 60000) % 60)).slice(-2)}:
   </span>
   <span className="digits  w-4">
    {('0' + Math.floor((props.time / 1000) % 60)).slice(-2)}.
   </span>
   <span className="digits mili-sec  w-4">
    {('0' + ((props.time / 10) % 100)).slice(-2)}
   </span>
  </div>
 );
};

export default Timer;
