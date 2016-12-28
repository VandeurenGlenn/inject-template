const assert = require('assert');
const {inject, injectSync} = require('../dist');

describe('inject-template', () => {
  it('Test inject!', () => {
    inject({path: 'test/test-el.js'}, content => {
      assert(content.includes('Something'), true);
    });
  });
  it('Test injectSync!', () => {
    let content = injectSync({path: 'test/test-el.js'});
    assert(content.includes('Something'), true);
  });
});
