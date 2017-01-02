'use strict';
class TestElRoot {
  constructor() {
    // @template
    this.root = this.attachShadow({mode: 'open'});
    this.someFunction();
  }
  someFunction() {
    // just to please eslint
  }
}
module.exports = new TestElRoot();
