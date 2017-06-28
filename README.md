# polymer-tags

Template-literal-based templates for Polymer 2.0

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

