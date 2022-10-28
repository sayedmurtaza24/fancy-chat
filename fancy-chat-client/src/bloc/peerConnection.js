import Peer from "peerjs";
import { config } from '../config';

// flattening out peerjs to allow separated actions to be dispatched from any view
export default (function () {
  let peer;
  let localStream;
  let remoteStream;

  return {
    setLocalStream: (stream) => { localStream = stream },
    getRemoteStream: () => remoteStream,
    init: (peerId,
      onOpenCallback,
      onCallInviteCallback,
      onCallInviteResponseCallback,
      onCallCallback,
      onCallEnd) => {
      peer = new Peer(peerId, config.isDev ? { host: config.host, port: config.port, path: '/p2p/call' } : undefined);
      peer.on('open', onOpenCallback);
      peer.on('call', call => {
        call.answer(localStream);
        call.on('stream', _remoteStream => {
          remoteStream = _remoteStream;
          onCallCallback(call.peer);
        });
      });
      peer.on('connection', conn => {
        conn.on('data', data => {
          if (data === '#call_rejection') {
            conn.send('#accepted');
            onCallEnd();
            remoteStream = null;
            localStream = null;
          }
          if (data === '#call_invitation') onCallInviteCallback(conn.peer);
          if (data === '#accepted' || data === '#rejected') onCallInviteResponseCallback(conn.peer, data);
        });
      });
    },
    sendCallInvite: (peerId, callback) => {
      const connection = peer.connect(peerId);
      connection.on('open', () => {
        connection.on('data', data => {
          if (data === '#accepted') callback(data);
          if (data === '#rejected') callback(data);
        });
        connection.send('#call_invitation');
      });
    },
    acceptCallInvite: (peerId, callback) => {
      const connection = peer.connect(peerId);
      connection.on('open', () => {
        connection.send('#accepted');
        callback();
      });
    },
    rejectCallInvite: (peerId, callback) => {
      const connection = peer.connect(peerId);
      connection.on('open', () => {
        connection.send('#rejected');
        callback();
      });
    },
    call: (peerId, onStreamOpen) => {
      const call = peer.call(peerId, localStream);
      call.on('stream', _remoteStream => {
        remoteStream = _remoteStream;
        onStreamOpen();
      });
    },
    sendCallReject: (peerId, callback) => {
      const connection = peer.connect(peerId);
      connection.on('open', () => {
        connection.on('data', data => {
          if (data === '#accepted') {
            callback(data);
            remoteStream = null;
            localStream = null;
          }
        });
        connection.send('#call_rejection');
      });
    },
  }
})();