import React from 'react';
import { useState } from 'react';
import shaders from '../shaders/shaders';
import './ChangeEffect.css';
import Effect from './Effect';

function ChangeEffect({ onEffectChange, show }) {
  const [effects] = useState(shaders.presets);
  const [selected, setSelected] = useState('Normal');
  const onEffectSelected = selectedEffect => {
    setSelected(selectedEffect.name);
    onEffectChange(selectedEffect.effect);
  }

  return (
    <div className="call-page__change-effect" style={{ display: show ? 'flex' : 'none' }}>
      <div className="call-page__change-effect-inner">
        <h2>Choose a filter</h2>
        <div className="effects">
          {effects.map(effect =>
            <Effect
              name={effect.name}
              key={effect.name}
              selected={(selected === effect.name)}
              onClick={() => onEffectSelected(effect)}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default ChangeEffect