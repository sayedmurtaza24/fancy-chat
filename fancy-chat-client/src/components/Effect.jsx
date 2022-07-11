import React from 'react';
import './Effect.css';

function Effect({ name, selected, onClick }) {
  return (
    <div className={"effect " + (selected ? "effect-active" : "")} onClick={onClick}>{name}</div>
  )
}

export default Effect