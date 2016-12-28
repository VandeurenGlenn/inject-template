'use strict';
class TestEl {
  constructor() {
    // @template
    this.someFunction();
  }
  someFunction() {
    // just to please eslint
  }
}
module.exports = new TestEl();
