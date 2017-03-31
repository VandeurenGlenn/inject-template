'use strict';
class TestElNamed {
  constructor() {
    // @template test-el-named
    this.someFunction();
  }
  someFunction() {
    // just to please eslint
  }
}
module.exports = new TestElNamed();
