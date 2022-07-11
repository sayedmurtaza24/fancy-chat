export const DOTS_FRAG_SHADER = `
  precision mediump float;
  uniform sampler2D tex0;
  uniform vec2 resolution;
  varying vec2 vTexCoord;
  vec2 center = vec2(320.0, 320.0);
  float angle = 1.1;
  float scale = 3.0;
  float pattern() {
    float s = sin(angle), c = cos(angle);
    vec2 tex = vTexCoord * resolution - center;
    vec2 point = vec2(c * tex.x - s * tex.y, s * tex.x + c * tex.y) * scale;
    return (sin(point.x) * sin(point.y)) * 4.0;
  }
  void main() {
        vec2 uv = vTexCoord;
    uv.y = 1.0 - uv.y;
    uv.x = 1.0 - uv.x;
        vec4 color = texture2D(tex0, uv);
        float average = (color.r + color.g + color.b) / 3.0;
    gl_FragColor = vec4(vec3(average * 10.0 - 5.0 + pattern()), color.a);
  }`;

export const INK_FRAG_SHADER = `
  precision mediump float;
  uniform sampler2D tex0;
  uniform vec2 resolution;
  varying vec2 vTexCoord;
  float strength = 0.6;
  void main(){
    vec2 uv = vTexCoord;
    uv.y = 1.0 - uv.y;
    uv.x = 1.0 - uv.x;
      vec2 dx = vec2(1.0 / resolution.x, 0.0);
      vec2 dy = vec2(0.0, 1.0 / resolution.y);
      vec4 color = texture2D(tex0, uv);
      float bigTotal = 0.0;
      float smallTotal = 0.0;
      vec3 bigAverage = vec3(0.0);
      vec3 smallAverage = vec3(0.0);
    for (float x = -2.0; x <= 2.0; x += 1.0) {
    for (float y = -2.0; y <= 2.0; y += 1.0) {
          vec3 sample = texture2D(tex0, uv + dx * x + dy * y).rgb;
      bigAverage += sample; bigTotal += 1.0;
      if (abs(x) + abs(y) < 2.0) {
        smallAverage += sample; smallTotal += 1.0;
      }
    }
    }
      vec3 edge = max(vec3(0.0), bigAverage / bigTotal - smallAverage / smallTotal);
    gl_FragColor = vec4(color.rgb - dot(edge, edge) * strength * 100000.0, color.a);
  }`

export const PIXELATE_FRAG_SHADER = `
  precision mediump float;
      uniform sampler2D tex0;
      uniform vec2 resolution;
      varying vec2 vTexCoord;
      vec2 center = vec2(320.0, 320.0);
      float scale = 10.0;
      void main(){
              vec2 uv = vTexCoord;
        uv.y = 1.0 - uv.y;
        uv.x = 1.0 - uv.x;
              vec2 tex = (uv * resolution - center) / scale;
        tex.y /= 0.866025404;
        tex.x -= tex.y * 0.5;
              vec2 a;
        if (tex.x + tex.y - floor(tex.x) - floor(tex.y) < 1.0) a = vec2(floor(tex.x), floor(tex.y));
        else a = vec2(ceil(tex.x), ceil(tex.y));
          vec2 b = vec2(ceil(tex.x), floor(tex.y));
          vec2 c = vec2(floor(tex.x), ceil(tex.y));
          vec3 TEX = vec3(tex.x, tex.y, 1.0 - tex.x - tex.y);
          vec3 A = vec3(a.x, a.y, 1.0 - a.x - a.y);
          vec3 B = vec3(b.x, b.y, 1.0 - b.x - b.y);
          vec3 C = vec3(c.x, c.y, 1.0 - c.x - c.y);
          float alen = length(TEX - A);
          float blen = length(TEX - B);
          float clen = length(TEX - C);
          vec2 choice; if (alen < blen) {
          if (alen < clen) choice = a; else choice = c;
        } else {
          if (blen < clen) choice = b; else choice = c;
        }
        choice.x += choice.y * 0.5;
        choice.y *= 0.866025404;
        choice *= scale / resolution;
        gl_FragColor = texture2D(tex0, choice + center / resolution);
}`