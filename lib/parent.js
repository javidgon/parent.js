/*
(c) 2014 Jose Vidal
Parent.js  may be freely distributed under the MIT license.
*/

function Class(methods, BaseClass) {

    var klass = function () {
        /* Trigger the "initialize" function with the provided parameters */
        this.initialize.apply(this, arguments);
    };

    if (typeof BaseClass === 'function') {
        /* If the "BaseClass" is provided, create a link between the
       child and the parent */
        klass.prototype = Object.create(BaseClass.prototype);
        klass.prototype.constructor = klass;
        /* Convenience attribute for accessing easily to the parent's methods */
        klass.prototype.super = BaseClass.prototype;
        /* Convenience attribute for accessing easily to the child's class */
        klass.prototype.class = klass;
    }

    for (var property in methods) {
        /* The methods starting with "__" are class's methods */
        if (property.substring(0, 2) === '__') {
            var __proto__ = Object.getPrototypeOf(klass)
            __proto__[property.substring(2)] = methods[property]
        } else {
            /* The rest are instance's methods */
            klass.prototype[property] = methods[property];
        }
    }

    if (!klass.prototype.initialize) {
        /* Create a dummy "initialize" function if it has not been previously provided */
        klass.prototype.initialize = function () {};
    }
    return klass;
}

if (typeof module !== 'undefined') {
  module.exports = Class;
}
