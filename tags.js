/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
 */

export function html(strings, ...values) {
  return {strings, values};
}

const bindingRegExp = /\[\[(\d*)\]\]/;
const PROP_BINDING = 1;
const ATTR_BINDING = 2;

const templates = new Map();

const renderPromise = Promise.resolve();
function scheduleRender(el) {
  renderPromise.then(() => el._render());
}

function getTemplateHtml(strings) {
  const parts = [];
  for (let i = 0; i < strings.length; i++) {
    parts.push(strings[i]);
    if (i < strings.length - 1) {
      parts.push(`[[${i}]]`);
    }
  }
  return parts.join('');
}

export function Tags(base) {
  return class TagsDemo extends base {

    render() {
      //abstract method should return a value created with html``
    }

    static finalize(name) {
      super.finalize();
      this._createObservedProperties();
      return true;
    }

    /**
     * Creates property accessors for the properties listed in the 
     * `observedProperties` array.
     */
    static _createObservedProperties() {
      if (this.properties) {
        for (const name of Object.keys(this.properties)) {
          this.prototype._createPropertyAccessor(name);
        }
      }
    }

    /**
     * Finds and applies bindings to textContent.
     * @override
     */
    static _parseTemplateNode(node, templateInfo, nodeInfo) {
      let noted = super._parseTemplateNode(node, templateInfo, nodeInfo);
      if (node.nodeType === Node.TEXT_NODE) {
        const match = node.textContent.match(bindingRegExp);
        if (match) {
          node.textContent = '';
          this._addBinding(nodeInfo,
            this._createBinding(PROP_BINDING, nodeInfo, 'textContent', match));
          noted = true;
        }
      }
      return noted;
    }

    /**
     * Associates a binding function with a template info object/node.
     * @param {object} info Template info object
     * @param {object} bindInfo Object containing bind info; required to have
     * an `apply` property that is a function called to apply the binding.
     */
    static _addBinding(info, bindInfo) {
      info.bindings = info.bindings || [];
      info.bindings.push(bindInfo);
    }

    /**
     *  Returns a function to call to set the binding
     * @param {number} type Type of binding
     * @param {object} nodeInfo Binding info object
     * @param {string} name Name of the property to set
     * @param {array} match Binding expression to handle
     * @returns {Function} A function to execute a binding
     */
    static _createBinding(type, nodeInfo, name, match) {
      const path = match[1];
      return { type, name, path,
        // root: this.prototype.getPathRoot(path),
        apply: this.prototype._applyBinding
      }
    }

    _setProperty(property, value) {
      super._setProperty(property, value);
      this._invalidate();
    }

    _invalidate() {
      if (!this.__needsRender) {
        this.__needsRender = true;
        scheduleRender(this);
      }
    }

    _render() {
      this.__needsRender = false;
      const renderResult = this.render();
      let dom;
      let template;
      if (this.__template == null) {
        template = templates.get(renderResult.strings);
        if (template === undefined) {
          const text = 
          template = document.createElement('template');
          template.innerHTML = getTemplateHtml(renderResult.strings);
          console.log(template.innerHTML);
          templates.set(renderResult.strings, template);
        }
        dom = this.root = this._stampTemplate(template);
        this._attachDom(this.root);
      } else {
        dom = this.root;
        template = this.__template;
      }

      for (const nodeInfo of Object.values(template._templateInfo.nodeInfoList)) {
        const node = dom.nodeList[nodeInfo.infoIndex];
        for (const binding of nodeInfo.bindings) {
          node[binding.name] = renderResult.values[binding.path];
        }
      }

      if (this.__template == null) {
        this.__template = template;
        this._attachDom(dom);
      }
    }

  }
}
