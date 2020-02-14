import * as PIXI from 'pixi.js';

export function ThresholdFilter(r, g, b) {

  const red   = r ? `${r}.0` : '0.0';
  const green = g ? `${g}.0` : '0.0';
  const blue  = b ? `${b}.0` : '0.0';

  PIXI.filters.AbstractFilter.call(this,
    null,
    [
      'precision mediump float;',
      'varying vec2 vTextureCoord;',
      'uniform sampler2D uSampler;',
      'uniform float threshold;',
      'void main(void)',
      '{',
      '    vec4 color = texture2D(uSampler, vTextureCoord);',
      `    vec3 mcolor = vec3(${red}/255.0, ${green}/255.0, ${blue}/255.0);`,
      '    if (color.a < threshold) {',
      '       gl_FragColor = vec4(vec3(0.0), 0.0);',
      '    } else {',
      '       gl_FragColor = vec4(mcolor, 1.0);',
      '    }',
      '}',
    ].join('\n'),
    {
      threshold: { type: '1f', value: 0.5 }
    }
  );
}
ThresholdFilter.prototype = Object.create(PIXI.filters.AbstractFilter.prototype);
ThresholdFilter.prototype.constructor = ThresholdFilter;
Object.defineProperties(ThresholdFilter.prototype, {
  threshold: {
    get: function () {
      return this.uniforms.threshold.value;
    },
    set: function (value) {
      this.uniforms.threshold.value = value;
    }
  }
});