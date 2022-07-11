import React from 'react';
import CallLogListItem from './CallLogListItem';

function CallLog({ log }) {
  return (
    <div>
      {log.map(logItem =>
        <CallLogListItem key={logItem.name} name={logItem.name} time={logItem.time} duration={logItem.duration} />
      )}
    </div>
  )
}

export default CallLog