import React from 'react';
import './CallLogListItem.css';

function CallLogListItem({ name, duration, time }) {
  return (
    <div className="log-list-item">
      <div className="log-list-item__avatar"><p>{name[1]}</p></div>
      <div className="log-list-item__info">
        <h4 className="log-list-item__name">{name}</h4>
        <div className="log-list-item__extra">
          <p className="log-list-item__dur">duration: {duration}</p>
          <p className="log-list-item__time">time: {time}</p>
        </div>
      </div>
      <button className="log-list-item__call-btn">📞</button>
    </div>
  )
}

export default CallLogListItem