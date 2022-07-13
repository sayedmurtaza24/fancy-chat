import React from 'react';
import CallLogListItem from './CallLogListItem';
import './CallLogList.css';

function CallLog({ logList }) {
  return (
    <div className="logs-list">
      {logList.map((logItem, i) =>
        <CallLogListItem
          key={i} 
          name={logItem.caller} 
          time={logItem.time} 
          duration={logItem.duration}
          type={logItem.type} />
      )}
    </div>
  )
}

export default CallLog