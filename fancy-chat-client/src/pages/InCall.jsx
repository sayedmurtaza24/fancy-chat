/* eslint-disable */
import React from 'react';
import { useEffect } from 'react';
import ChangeEffect from '../components/ChangeEffect';
import { CURRENT_MODE, endOngoingCall, startCalling } from '../slices/callSlice';
import { useRef } from 'react';
import Sketch from 'react-p5';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import peerConnection from '../bloc/peerConnection';
import shaders from '../shaders/shaders';

import './InCall.css';
import 'webrtc-adapter';

function InCall() {
  const bgVideoRef = useRef(null);
  const currentMode = useSelector(state => state.call.currentMode);
  const caller = useSelector(state => state.call.caller);
  const isStreaming = useSelector(state => state.call.isStreaming);
  const dispatch = useDispatch()
  const hiddenVideo = useRef(null);
  const cameraCanvas = useRef(null);
  const p5Instance = useRef(null);

  const [localStream, setLocalStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);
  const [localCapture, setLocalCapture] = useState(null);
  const [showEffect, setShowEffect] = useState(false);
  const [shader, setShader] = useState(null);

  useEffect(() => {
    if (!localStream) return;
    peerConnection.setLocalStream(localStream);
    if (currentMode === CURRENT_MODE.OUTGOING_CALL_ACCEPTED) {
      dispatch(startCalling(caller));
    }
  }, [localStream]);

  useEffect(() => {
    if (isStreaming) setRemoteStream(peerConnection.getRemoteStream());
  }, [isStreaming]);

  useEffect(() => {
    return () => localCapture?.remove();
  }, [localCapture])

  useEffect(() => {
    bgVideoRef.current.srcObject = remoteStream;
  }, [remoteStream]);

  const setup = (p5, canvasParent) => {
    p5Instance.current = p5;
    p5.createCanvas(640, 360, p5.WEBGL).parent(canvasParent);
    const capture = p5.createCapture(p5.VIDEO);
    capture.hide();
    setLocalCapture(capture);

    cameraCanvas.current = document.getElementById("defaultCanvas0");
    setLocalStream(cameraCanvas.current.captureStream(30));

    const _shader = p5.createShader(shaders.vert, shaders.presets[0].effect);
    setShader(_shader);
  }

  const draw = p5 => {
    if (localCapture && shader) {
      p5.background(0);
      p5.scale(-1, 1)
      p5.image(localCapture, -640, 0, 640, 360);
      p5.shader(shader);
      shader.setUniform('tex0', localCapture);
      shader.setUniform('resolution', [p5.width, p5.height]);
      p5.rect(0, 0, p5.width, p5.height);
    }
  }

  const onEffectChange = effect => {
    setShader(p5Instance.current.createShader(shaders.vert, effect));
    setShowEffect(false);
  }

  const openEffects = () => setShowEffect(true);

  const endCall = () => {
    dispatch(endOngoingCall(caller));
  }

  return (
    <div className="call-page">
      <div className="call-page__bg">
        <video
          ref={bgVideoRef}
          crossOrigin={'anonymous'}
          className="call-page__caller-video"
          autoPlay={true} />
      </div>
      <div className="call-page__fg">
        <div className="call-page__heading">
          <h2 className="call-page__friend-name">@{caller}</h2>
          <div className="call-page__mirror-cam">
            <Sketch setup={setup} draw={draw} />
          </div>
        </div>
        <div className="call-page__control-btns">
          <button className="call-page__btn call-page__btn--change" onClick={openEffects}>Change Effect</button>
          <button className="call-page__btn call-page__btn--end" onClick={endCall}>End Call</button>
        </div>
        <ChangeEffect show={showEffect} onEffectChange={onEffectChange} />
      </div>
      <video ref={hiddenVideo} style={{ display: 'none' }} autoPlay></video>
      <div id="canvasHolder"></div>
    </div >
  )
}

export default InCall;