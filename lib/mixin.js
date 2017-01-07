'use strict';
/**
 * @mixin inject-template
 * @param {string|text} content.
 * @return {boolean} true when shadowRoot detected.
 */
const searchForShadowRoot = content => {
  const roots = [
    'this.root', 'this._root', 'let root', 'let _root',
    'this.shadowRoot', 'this._shadowRoot', 'let shadowRoot', 'let _shadowRoot'];
  if (typeof content !== 'string') {
    content = String(content);
  }
  for (let root of roots) {
    if (content.includes(root)) {
      return true;
    }
  }
  return false;
};

export default {
  searchForShadowRoot: searchForShadowRoot
};
