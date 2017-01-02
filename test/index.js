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

  it('Test inject [root]!', () => {
    inject({path: 'test/test-el-root.js'}, content => {
      assert(content.includes('Shadow dom :o'), true);
    });
  });

  it('Test injectSync [root]!', () => {
    let content = injectSync({path: 'test/test-el-root.js'});
    assert(content.includes('Shadow dom :o'), true);
  });
});
