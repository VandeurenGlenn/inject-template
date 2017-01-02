'use strict';
const {readFile} = require('fs');

/**
 * @module getContent
 * @mixin injectSync
 * @param {string} content Tries to read file from path, if there is no content.
 * @param {string} path needed when there is no content.
 * @param {string} cb content of the file
 * @return {string} cb
 */
const getContent = (content, path, cb) => {
  if (content === null || content === undefined) {
    readFile(path, (error, content) => {
      if (error) {
        return console.error(error);
      }
      cb(content.toString());
    });
  } else {
    cb(content);
  }
};
/**
 * @module getTemplateContent
 * @mixin injectSync
 * @param {string} path Path to template.
 * @param {string} cb content of the template
 * @return {string} cb
 */
const getTemplateContent = (path, cb) => {
  if (path === null) {
    return console.error('path is undefined');
  }
  readFile(path, (error, template) => {
    if (error) {
      return console.error(error);
    }
    template = template.toString();
    let startIndex = template.indexOf('<template>');
    let endIndex = template.indexOf('</template>');
    let content = template.slice((startIndex + 11), (endIndex - 1));
    cb(content.trim());
  });
};
/**
 * @module searchForShadowRoot
 * @mixin injectSync
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
/**
 * @module injectSync
 * @param {object} opts options
 * @param {string} opts.path Path to file to inject template to.
 * @param {string} opts.content The file content (used when streaming files...)
 * @param {string} opts.templatePath A alternate path to search for the template
 * When not used injectTemplate will assume the template is located in the same
 * folder & under the same name except the extension off course.
 * @param {string} cb fileContent
 * @return {string} cb
 */
export default (opts = {path: null, content: null, templatePath: null}, cb) => {
  if (opts.path === null) {
    return console.error('path undefined');
  }
  if (opts.templatePath === null || opts.templatePath === undefined) {
    opts.templatePath = opts.path.replace('.js', '.html');
  }
  getContent(opts.content, opts.path, fileContent => {
    getTemplateContent(opts.templatePath, templateContent => {
      let hasRoot = searchForShadowRoot(fileContent);
      // TODO: Check if component has root
      let _templateContent = '`';
      _templateContent += templateContent + '`';
      fileContent = fileContent
        .replace('// @template',
					`this${hasRoot ? '.root.' : '.'}innerHTML = ${_templateContent};`);
      cb(fileContent);
    });
  });
};
