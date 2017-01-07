'use strict';
/**
 * @mixin inject-template
 * @param {string|text} content.
 * @return {boolean} true when shadowRoot detected.
 */
const searchForShadowRoot = content => {
  if (typeof content !== 'string') {
    content = String(content);
  }
  if (content.includes('this.root') || content.includes('this._root') ||
      content.includes('let root') || content.includes('let root')) {
    return true;
  }
  return false;
};

export default {
  searchForShadowRoot: searchForShadowRoot
};
