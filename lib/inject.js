'use strict';
const {readFile} = require('fs');
import mixin from './mixin';

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
      console.warn('template not found: ' + path);
      return cb(undefined);
    }
    template = template.toString();
    let startIndex = template.indexOf('<template>');
    let endIndex = template.indexOf('</template>');
    let content = template.slice((startIndex + 11), (endIndex - 1));
    cb(content.trim());
  });
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
      if (templateContent === undefined) {
        return cb(fileContent);
      }
      let hasRoot = mixin.searchForShadowRoot(fileContent);
      let _templateContent = '`';
      _templateContent += templateContent + '`';
      fileContent = fileContent
        .replace('// @template',
					`this${hasRoot ? '.root.' : '.'}innerHTML = ${_templateContent};`);
      cb(fileContent);
    });
  });
};
