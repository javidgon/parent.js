parent.js
=========
[![Build Status](https://travis-ci.org/javidgon/parent.js.svg)](https://travis-ci.org/javidgon/parent.js)
[![Coverage Status](https://coveralls.io/repos/javidgon/parent.js/badge.png)](https://coveralls.io/r/javidgon/parent.js)
> Javascript inheritance for a 5 years old

**Javascript** is great, we all know that. **Prototypal inheritance** is really powerful and some people can do awesome
things with that, but let's face it, it has its quirks. Also 99% of the time we only want to create `Classes` and do simple inheritance. It shouldn't be complicated or prone to errors.

**Parent.js** is a micro library (less than 30 lines of code), that allows you to create javascript `Classes` (or in `js` terminology `function constructors`) and, at the same time, inherit easily from other Classes.

## Use

For using this library, you just need to create your `Classes` with the following syntax:
```javascript
var Person = Class({
  // Methods go here...
  ...
}, <BaseClass>)
```

And this is it! Please keep in mind that `<BaseClass>` is optional. Not every class needs to inherit! :smirk:.
Let's see more examples:

```javascript
var Person = Class({
  initialize: function (name, surname) {
    this.name = name;
    this.surname = surname;
  },
  sayHi: function () {
    return 'Hi I\'m a Person!!';
  }
});

var Student = Class({
  initialize: function (name, surname, bachelor) {
    this.super.initialize(name, surname);
    this.bachelor = bachelor;
  },
  study: function () {
    return 'I\'m Studying!'
    
  },
  sayHi: function () {
    return 'Hi I\'m a Student!!';
  }
}, Person);

var student = new Student('Jose', 'Vidal', 'Computer Science');

console.dir(student.name, student.bachelor);
// Output: "Jose, Computer Science" 

console.dir(student.sayHi());
// Output: "Hi I'm a Student!" 

console.dir(student.super.sayHi());
// Output: "Hi I'm a Person!" 

console.log(student instanceof Student);
// Output: true 
console.log(student instanceof Person);
// Output: true 
```
You can see how the use of `parent's methods` is trivial with the attribute `super` from the instances.

## Advanced Use
A nice feature is the possibility of creating `class` methods (only accessible by the class) by prepending `__` (two underscores) to the name of the method.

```javascript
var Person = Class({
  initialize: function (name, surname) {
    this.name = name;
    this.surname = surname;
  },
  __thisIsAClassMethod: function () {
    return 'Hi I\'m a classmethod!';
  },
  thisIsAnInstanceMethod: function () {
    return 'Hi I\'m an instancemethod!';
  }
});

var person = new Person('Jose', 'Vidal');

// Class:
console.log(Person.thisIsAClassMethod());
// Output: 'Hi I\'m a classmethod!'

console.log(Person.thisIsAnInstanceMethod());
// Output: TypeError: undefined is not a function

// Instance:
console.log(person.thisIsAClassMethod());
// Output: TypeError: undefined is not a function

console.log(person.thisIsAnInstanceMethod());
// Output: 'Hi I\'m an instancemethod!'
```

## Installation

```javascript
bower install parent.js
```
or
```javascript
npm install parent.js
```

**Enjoy!**

## Contribute

Simply make a PR.

## Licente

MIT
