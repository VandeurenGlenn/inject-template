'use strict';
const path = require('path');
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

/**
 * @mixin inject-template
 * @param {string} templatePath a custom path to your template.
 * @param {string} src the src path of your element, when no templatePath given src.js will be converted to src.html.
 * @param {string} name the name of your template, when using the same template in multiple elements or when using multiple templates in the same file/element.
 * @return {string} computed templatePath.
 * @example
 * mixin.constructTemplatePath(null, 'test/test-el.js', null) // returns test/test-el.html
 * mixin.constructTemplatePath(null, 'test/test-el-named.js', test-el) // returns test/test-el.html
 */
const constructTemplatePath = (templatePath, src, name) => {
  if (templatePath === null || templatePath === undefined) {
    if (name) {
      templatePath = src.replace(/\/([^/]*)$/, `/${name}.html`);
    } else {
      templatePath = src.replace('.js', '.html');
    }
  } else if (templatePath && name) {
    templatePath = path.join(process.cwd(), templatePath, `${name}.html`);
  } else if (templatePath) {
    templatePath = path.join(process.cwd(), templatePath, path.basename(src).replace('.js', '.html'));
  }
  return templatePath;
};

const searchForTag = content => {
  const match = content.match(/\/\/ @template(.*)/);
  if (match !== null && !match[0]) {
    console.warn('no @template tag found');
  }
  return {tag: match ? match[0] : null, name: match ? match[1].trim() : null};
};

/**
 * @mixin inject-template
 * Constructs the tag to be replace by the template
 * @param {string} src the src path of your element.
 * @param {string} name the name of your template.
 * @return {string} computed tag.
 * @example
 * mixin.constructTag('test/test-el.js') // returns '// @template test-el'
 * mixin.constructTag('test/test-el-named.js', test-el) // returns '// @template test-el'
 */
const constructTag = (src, name) => {
  if (name) {
    return `// @template ${name}`;
  } else if (src) {
    return `// @template ${path.basename(src).replace('.html', '')}`;
  }
};

export default {
  searchForShadowRoot: searchForShadowRoot,
  constructTag: constructTag,
  constructTemplatePath: constructTemplatePath,
  searchForTag: searchForTag
};
