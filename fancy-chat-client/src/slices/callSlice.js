import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import peerConnection from "../bloc/peerConnection";

export const CURRENT_MODE = Object.freeze({
  CLOSED: 'CLOSED',
  IDLE: 'IDLE',
  INCOMING_CALL_RINGING: 'INCOMING_CALL_RINGING',
  OUTGOING_CALL_RINGING: 'OUTGOING_CALL_RINGING',
  INCOMING_CALL_ACCEPTED: 'INCOMING_CALL_ACCEPTED',
  OUTGOING_CALL_ACCEPTED: 'OUTGOING_CALL_ACCEPTED',
});

const initialState = {
  currentMode: CURRENT_MODE.CLOSED,
  caller: null,
  isStreaming: false,
};

const initPeerConnection = createAsyncThunk('init', (peerId, thunkAPI) => {
  peerConnection.init(peerId,
    () => thunkAPI.dispatch({
      type: 'call/changeMode',
      payload: { mode: CURRENT_MODE.IDLE, caller: null }
    }),
    (peerId) => thunkAPI.dispatch({
      type: 'call/changeMode',
      payload: { mode: CURRENT_MODE.INCOMING_CALL_RINGING, caller: peerId },
    }),
    (peerId, response) => {
      if (response === "#accepted") {
        thunkAPI.dispatch({
          type: 'call/changeMode',
          payload: { mode: CURRENT_MODE.OUTGOING_CALL_ACCEPTED, caller: peerId },
        });
      } else {
        thunkAPI.dispatch({
          type: 'call/changeMode',
          payload: { mode: CURRENT_MODE.IDLE, caller: null },
        });
      }
    },
    (peerId) => {
      thunkAPI.dispatch({
        type: 'call/changeMode',
        payload: { mode: CURRENT_MODE.INCOMING_CALL_ACCEPTED, caller: peerId, streaming: true },
      });
    },
    () => thunkAPI.dispatch({
      type: 'call/changeMode',
      payload: { mode: CURRENT_MODE.IDLE, caller: null },
    }));
});

const sendCallInvitation = createAsyncThunk('invite', (peerId, thunkAPI) => {
  thunkAPI.dispatch({
    type: 'call/changeMode',
    payload: { mode: CURRENT_MODE.OUTGOING_CALL_RINGING, caller: peerId },
  });
  peerConnection.sendCallInvite(peerId);
});

const acceptIncomingCall = createAsyncThunk('accept', (peerId, thunkAPI) => {
  peerConnection.acceptCallInvite(peerId, () => thunkAPI.dispatch({
    type: 'call/changeMode',
    payload: { mode: CURRENT_MODE.INCOMING_CALL_ACCEPTED, caller: peerId },
  }));
});

const rejectIncomingCall = createAsyncThunk('reject', (peerId, thunkAPI) => {
  peerConnection.rejectCallInvite(peerId, () => thunkAPI.dispatch({
    type: 'call/changeMode',
    payload: { mode: CURRENT_MODE.IDLE, caller: null },
  }));
});

const startCalling = createAsyncThunk('call', (peerId, thunkAPI) => {
  peerConnection.call(peerId, () => {
    thunkAPI.dispatch({
      type: 'call/changeMode',
      payload: { mode: CURRENT_MODE.OUTGOING_CALL_ACCEPTED, caller: peerId, streaming: true },
    });
  });
});

const endOngoingCall = createAsyncThunk('end', (peerId, thunkAPI) => {
  peerConnection.sendCallReject(peerId, () => {
    thunkAPI.dispatch({
      type: 'call/changeMode',
      payload: { mode: CURRENT_MODE.IDLE, caller: null },
    });
  });
});

const callSlice = createSlice({
  name: 'call',
  initialState,
  reducers: {
    changeMode: (state, { payload: { mode, caller, streaming = false } }) => {
      state.currentMode = mode;
      state.caller = caller;
      state.isStreaming = streaming;
    },
  },
});

export {
  sendCallInvitation,
  initPeerConnection, 
  acceptIncomingCall, 
  rejectIncomingCall, 
  endOngoingCall, 
  startCalling
};
export default callSlice.reducer;