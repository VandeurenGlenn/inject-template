'use strict';
const {readFileSync} = require('fs');

/**
 * @module getContent
 * @mixin injectSync
 * @param {string} content Tries to read file from path, if there is no content.
 * @param {string} path needed when there is no content.
 * @return {string} content of the file
 */
const getContent = (content, path) => {
  if (content === null || content === undefined) {
    content = readFileSync(path).toString();
  }
  return content;
};
/**
 * @module getTemplateContent
 * @mixin injectSync
 * @param {string} path Path to template.
 * @return {string} content of the template
 */
const getTemplateContent = path => {
  if (path === null) {
    return console.error('path is undefined');
  }
  let template = readFileSync(path).toString();
  let startIndex = template.indexOf('<template>');
  let endIndex = template.indexOf('</template>');
  let content = template.slice((startIndex + 11), (endIndex - 1));
  return content.trim();
};
/**
 * @module injectSync
 * @param {object} opts options
 * @param {string} opts.path Path to file to inject template to.
 * @param {string} opts.content The file content (used when streaming files...)
 * @param {string} opts.templatePath A alternate path to search for the template
 * When not used injectTemplate will assume the template is located in the same
 * folder & under the same name except the extension off course.
 * @return {string} fileContent
 */
export default (opts = {path: null, content: null, templatePath: null}) => {
  let hasRoot = false;
  if (opts.path === null) {
    return console.error('path undefined');
  }
  if (opts.templatePath === null || opts.templatePath === undefined) {
    opts.templatePath = opts.path.replace('.js', '.html');
  }
  let fileContent = getContent(opts.content, opts.path);
  let templateContent = getTemplateContent(opts.templatePath);
  if (fileContent.includes('this.root') || fileContent.includes('root')) {
    hasRoot = true;
  }
  let _templateContent = '`';
  _templateContent += templateContent + '`';
  // TODO: Check if component has root
  fileContent = fileContent
    .replace('// @template',
      `this${hasRoot ? '.root.' : '.'}innerHTML = ${_templateContent};`);
  return fileContent;
};
