const assert = require('assert');
const {inject, injectSync} = require('../dist');

describe('inject-template', () => {
  it('should pass inject', done => {
    inject({path: 'test/test-el.js'}, content => {
      assert.equal(content.includes('Something'), true);
      done();
    });
  });

  it('should pass inject [root]!', done => {
    inject({path: 'test/test-el-root.js'}, content => {
      assert.equal(content.includes('Shadow dom :o'), true);
      done();
    });
  });

  it('Should pass inject [named]!', done => {
    inject({path: 'test/test-el-named.js', name: 'test-el'}, content => {
      assert.equal(content.includes('Something'), true);
      done();
    });
  });

  it('Should pass injectSync!', done => {
    let content = injectSync({path: 'test/test-el-named.js'});
    assert.equal(content.includes('Something'), true);
    done();
  });

  it('Should pass injectSync [root]!', done => {
    let content = injectSync({path: 'test/test-el-root.js'});
    assert.equal(content.includes('Shadow dom :o'), true);
    done();
  });

  it('Should pass injectSync [named]!', done => {
    let content = injectSync({path: 'test/test-el-named.js', name: 'test-el'});
    assert.equal(content.includes('Something'), true);
    done();
  });

  it('Should pass injectSync [templatePath]!', done => {
    let content = injectSync({path: 'test/test-el-named.js', templatePath: 'test/templates', name: 'test-el-templates-path'});
    assert.equal(content.includes('Something'), true);
    done();
  });
});
