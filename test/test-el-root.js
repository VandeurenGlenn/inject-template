'use strict';
class TestElRoot {
  constructor() {
    this.root = this.attachShadow({mode: 'open'});
    // @template
    this.someFunction();
  }
  someFunction() {
    // just to please eslint
  }
}
module.exports = new TestElRoot();
