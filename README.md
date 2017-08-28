# polymer-tags

Template-literal-based templates for Polymer 2.0

## 🚧 This is a deprecated early experiment. Please see lit-html 🚧

This code was an initial attempt to add template-literal based templates directly to Polymer 2 as a mixin. These ideas were brough into lit-html as a standalone library, but this code is useful for archeology on how to wire up extensions to Polymer's template system.

This repo is unmaintained, please use lit-html instead: https://github.com/PolymerLabs/lit-html

## Example

```javascript
import {Element as PolymerElement} from './node_modules/@polymer/polymer/polymer-element.js';
import {Tags, html} from './tags.js';

class TagsDemo extends Tags(PolymerElement) {

  static get properties() { return {
    name: String,
    age: Number,
  }};

  constructor() {
    super();
    this.name = 'Justin';
    this.age = 41;
  }

  render() {
    return html`
      <h1>${this.name}</h1>
      <div>${this.age > 21 ? "Can" : "Can't"} drink</div>
    `;
  }

}
```

## Setup

This project requires the JS modules version of Polymer. Ask if you need access.

