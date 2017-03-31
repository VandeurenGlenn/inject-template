'use strict';
class TestElRoot {
  constructor() {
    this.root = this.attachShadow({mode: 'open'});
    // @template test-el-root
    this.someFunction();
  }
  someFunction() {
    // just to please eslint
  }
}
module.exports = new TestElRoot();
