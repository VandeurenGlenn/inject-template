'use strict';
const {readFileSync} = require('fs');
import mixin from './mixin';

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
  try {
    let template = readFileSync(path).toString();
    let startIndex = template.indexOf('<template>');
    let endIndex = template.indexOf('</template>');
    let content = template.slice((startIndex + 11), (endIndex - 1));
    return content.trim();
  } catch (error) {
    console.warn('template not found: ' + path);
    return undefined;
  }
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
export default (opts = {path: null, content: null, templatePath: null, name: null}) => {
  if (opts.path === null) {
    return console.error('path undefined');
  }
  let fileContent = getContent(opts.content, opts.path);
  const info = mixin.searchForTag(fileContent);
  const tag = info.tag;
  if (!opts.name) {
    opts.name = info.name;
  }
  const templatePath = mixin.constructTemplatePath(opts.templatePath, opts.path, opts.name);
  let templateContent = getTemplateContent(templatePath);
  if (templateContent === undefined) {
    return fileContent;
  }
  let hasRoot = mixin.searchForShadowRoot(fileContent);
  let _templateContent = '`';
  _templateContent += templateContent + '`';
  fileContent = fileContent
    .replace(tag,
      `this${hasRoot ? '.root.' : '.'}innerHTML = ${_templateContent};`);
  return fileContent;
};
