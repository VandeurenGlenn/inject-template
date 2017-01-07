# inject-template [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url] [![Coverage percentage][coveralls-image]][coveralls-url]
> Inject template into innerHTML

## Installation

```sh
$ npm install --save inject-template
```

## Usage
- An template tag in the desired element <sup>1</sup>
- An html template <sup>2</sup>

```js
var injectTemplate = require('inject-template');

let result = injectTemplate.inject({path: 'rainbow.js'});
// dosomething with result ...
```

### result
```js
class Rainbow extends HTMLElement {
  constructor() {
    super();
    this.innerHTML = 'BIG RAINBOW';
  }
  ...
}
```

#### rainbow.js <sup>1</sup>
```js
class Rainbow extends HTMLElement {
  constructor() {
    super();
    // @template
  }
  ...
}
```

#### rainbow.html <sup>2</sup>
```html
<template>
  BIG RAINBOW
</template>
```

## API

### injectTemplate.inject({options})
### injectTemplate.injectSync({options})
#### options

#### path
Type: `string`<br>
Default: `null`

Path to file containing the template tag

#### templatePath
Type: `string`<br>
Default: `null`

Path to the template (use when your template is in another directory).

*When undefined inject-template assumes the template in in the same directory of the element*

#### content
Type: `string`<br>
Default: `null`

The content of the element (used in [gulp-inject-html-template](https://github.com/VandeurenGlenn/gulp-inject-html-template))

*When streaming files, you can pass trough the content so inject-template doesn't need to read the element.*

## License

MIT © [Glenn Vandeuren]()


[npm-image]: https://badge.fury.io/js/inject-template.svg
[npm-url]: https://npmjs.org/package/inject-template
[travis-image]: https://travis-ci.org/VandeurenGlenn/inject-template.svg?branch=master
[travis-url]: https://travis-ci.org/VandeurenGlenn/inject-template
[daviddm-image]: https://david-dm.org/VandeurenGlenn/inject-template.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/VandeurenGlenn/inject-template
[coveralls-image]: https://coveralls.io/repos/VandeurenGlenn/inject-template/badge.svg
[coveralls-url]: https://coveralls.io/r/VandeurenGlenn/inject-template
