import { DOTS_FRAG_SHADER, INK_FRAG_SHADER, PIXELATE_FRAG_SHADER } from "./specialEffects";

const createFilterMatrixFragShader = ({
  matrixArray = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
  offsetArray = [0, 0, 0, 0],
  brightness = 0,
  contrast = 0,
  saturation = 0,
  exposure = 0
}) => `
  precision mediump float;
  uniform sampler2D tex0;
  varying vec2 vTexCoord;
  vec3 adjustSaturation(vec3 color, float value) {
    const vec3 luminosityFactor = vec3(0.2126, 0.7152, 0.0722);
    vec3 grayscale = vec3(dot(color, luminosityFactor));
    return mix(grayscale, color, 1.0 + value);
  }
  vec3 adjustExposure(vec3 color, float value) {
    return (1.0 + value) * color;
  }
  vec3 adjustContrast(vec3 color, float value) {
    return 0.5 + (1.0 + value) * (color - 0.5);
  }
  vec3 adjustBrightness(vec3 color, float value) {
    return color + value;
  }
  void main() {
    vec2 uv = vTexCoord;
    uv.y = 1.0 - uv.y;
    uv.x = 1.0 - uv.x;

    vec4 texel = texture2D(tex0, uv);
    vec3 color = texel.rgb;

    color = adjustExposure(color, ${exposure.toPrecision(3)});
    color = adjustBrightness(color, ${brightness.toPrecision(3)});
    color = adjustContrast(color, ${contrast.toPrecision(3)});
    color = adjustSaturation(color, ${saturation.toPrecision(3)});

    mat4 u_matrix = mat4(${matrixArray.map(x => x.toPrecision(4)).join(",")});

    vec4 u_offset = vec4(${offsetArray.map(x => x.toPrecision(3)).join(",")});

    gl_FragColor = texel * u_matrix + u_offset;
  }
`;

const shaders = {
  vert: `
    attribute vec3 aPosition;
    attribute vec2 aTexCoord;
    varying vec2 vTexCoord;
    void main() {
      vTexCoord = aTexCoord;
      vec4 positionVec4 = vec4(aPosition, 1.0);
      positionVec4.xy = positionVec4.xy * 2.0 - 1.0;
      gl_Position = positionVec4;
    }`,
  presets: [{
    name: 'Normal',
    effect: createFilterMatrixFragShader({
      matrixArray: [1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0],
    }),
  }, {
    name: 'Preset 1',
    effect: createFilterMatrixFragShader({
      matrixArray: [1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, -0.2, 0.2, 0.1, 0.4, 0.0, 0.0, 0.0, 1.0],
    }),
  }, {
    name: 'Preset 2',
    effect: createFilterMatrixFragShader({
      matrixArray: [1.0, 0.0, 0.0, 0.0, 0.0, 1.398, 0.0, 0.0, 0.398, 0.2, 1.0, 0.4, -0.231, -0.231, 0.0, 1.0],
      contrast: 0.3,
      exposure: -0.1,
    }),
  }, {
    name: 'Preset 3',
    effect: createFilterMatrixFragShader({
      matrixArray: [1.242, 0.0, 0.0, 0.0, 0.0, 0.913, 0.0, 0.0, 0.0, 0.0, 0.579, 0.0, 0.0, 0.0, 0.0, 1.0],
      contrast: 0.2,
      exposure: 0.1,
    }),
  }, {
    name: 'Preset 4',
    effect: createFilterMatrixFragShader({
      matrixArray: [1.242, 0.393, -0.534, 0.0, -0.247, 0.907, 0.105, 0.0, -0.445, 0.521, 1.472, 0.0, 0.0, 0.0, 0.0, 1.0],
      contrast: 0.2,
      exposure: 0.1,
    }),
  }, {
    name: 'Preset 5',
    effect: createFilterMatrixFragShader({
      matrixArray: [1.0, 0.0, 0.254, 0.0, 0.264, 1.0, 0.0, 0.0, -0.2, -0.516, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0],
      offsetArray: [0.1, 0.0, 0.1, 0.0],
      contrast: 0.3,
      exposure: 0.1,
    })
  }, {
    name: 'Preset 6',
    effect: createFilterMatrixFragShader({
      offsetArray: [0.0, 0.0, 0.2, 0.0],
      contrast: 0.3,
      exposure: 0.2,
    })
  }, {
    name: 'Dots',
    effect: DOTS_FRAG_SHADER,
  }, {
    name: 'Pixalate',
    effect: PIXELATE_FRAG_SHADER,
  }, {
    name: 'Ink',
    effect: INK_FRAG_SHADER,
  }],
}

export default shaders;