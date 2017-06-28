/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
 */

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
customElements.define('tags-demo', TagsDemo);
