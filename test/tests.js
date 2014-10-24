var assert = require("assert")
var Class = require('../lib/parent.js');

describe('Parent.js', function(){
    var Person;
    var Student;
    var name = 'Name';
    var surname = 'Surname';
    var bachelor = 'Computer Science';
    var something = 'Hello people';

    beforeEach(function(){
      Person = Class({
        initialize: function (name, surname) {
          this.name = name,
          this.surname = surname
        },
        __privateTalk: function (something) {
          return 'Person: ' + something;
        },
        saySomething: function (something) {
          return 'Person: ' + something;
        }
      });
      Student = Class({
        initialize: function (name, surname, bachelor) {
          this.super.initialize(name, surname);
          this.bachelor = bachelor;
        },
        saySomething: function (something) {
          return 'Student: ' + something;
        }
      }, Person);

      LastYearStudent = Class({}, Student);
 
    });
    it('should create a Class with some methods and attributes', function(){
      var person = new Person(name, surname);
      assert.equal(person.name, name);
      assert.equal(person.surname, surname);
      assert.equal(person.saySomething(something), 'Person: ' + something);
      assert.equal(person instanceof Person, true);
    });

    it('should create a Child Class with some methods and attributes', function(){
      var student = new Student(name, surname, bachelor);
      assert.equal(student.name, name);
      assert.equal(student.surname, surname);
      assert.equal(student.bachelor, bachelor);
      assert.equal(student.saySomething(something), 'Student: ' + something);
      assert.equal(student instanceof Person, true);
      assert.equal(student instanceof Student, true);
    });

    it('should allow the Child Class to access some parent\'s methods', function(){
      var student = new Student(name, surname, bachelor);
      assert.equal(student.super.saySomething(something), 'Person: ' + something);
      assert.equal(student instanceof Person, true);
      assert.equal(student instanceof Student, true);
    });

    it('should create an initialize method by default', function(){
      var lastYearStudent = new LastYearStudent(name, surname, bachelor);
      assert.equal(lastYearStudent.name, name);
      assert.equal(lastYearStudent.super.super.saySomething(something), 'Person: ' + something);
      assert.equal(lastYearStudent.super.saySomething(something), 'Student: ' + something);
    });

    it('should distinguish between class and instance methods', function(){
      var student = new Student(name, surname, bachelor);
      assert.equal(Student.privateTalk(something), 'Person: ' + something);
      assert.equal('__privateTalk' in Student, false);
      assert.equal('privateTalk' in student, false);
      assert.equal('__privateTalk' in student, false);
    });

    it('should allow instances to access their Classes with the keyword "super"', function(){
      var student = new Student(name, surname, bachelor);
      assert.ok(student.class == student.constructor);
      assert.ok(student.class == Student);
    });
})
