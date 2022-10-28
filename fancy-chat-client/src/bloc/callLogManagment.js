import userManagement from './userManagement';
import { config } from '../config';

export const CALL_LOG_TYPE = Object.freeze({
  INCOMING_REJECTED: 'INCOMING_REJECTED',
  OUTGOING_REJECTED: 'OUTGOING_REJECTED',
  INCOMING_ACCEPTED: 'INCOMING_ACCEPTED',
  OUTGOING_ACCEPTED: 'OUTGOING_ACCEPTED',
});

export default (function () {
  let startTime;
  let caller;
  let type;

  return {
    signalCallStart(peerId, logType) {
      type = logType;
      caller = peerId;
      startTime = Date.now();
    },
    getLastCallLog() {
      return {
        type,
        caller,
        duration: (Date.now() - startTime) / 1000,
      }
    },
    async saveCallLog(callLog) {
      const response = await fetch(`${config.fullAddress()}/api/protected/logs`, {
        method: "POST",
        body: JSON.stringify(callLog),
        headers: {
          'content-type': 'application/json',
          'auth-token': userManagement.getToken(),
        },
      });
      if (response.status !== 200) {
        throw Error((await response.json()))
      }
    },
    async fetchAllCallLogs() {
      const response = await fetch(`${config.fullAddress()}/api/protected/logs/all`, {
        method: "POST",
        headers: {
          'auth-token': userManagement.getToken(),
        }
      });
      if (response.status !== 200) {
        throw Error((await response.json()))
      }
      return await response.json();
    },
  }
})();