"use strict";

function Element(tagName, props, children) {
    if (!(this instanceof Element)) {
        return new Element(tagName, props, children);
    }
    this.tagName = tagName;
    this.props = props || {};
    this.children = children || [];
    this.key = props ? props.key : undefined;

    let count = 0;
    this.children.forEach((child) => {
        if (child instanceof Element) {
            count += child.count;
        }
        count++;
    });
    this.count = count;
}

Element.prototype.render = function() {
    const el = document.createElement(this.tagName);
    const props = this.props;

    for (const propName in props) {
        setAttr(el, propName, props[propName]);
    }

    this.children.forEach((child) => {
        const childEl = (child instanceof Element) ? child.render() : document.createTextNode(child);
        el.appendChild(childEl);
    });

    return el;
};

window.Element = Element;
