"use strict";
//string
var myName = 'Dan';
//myName =28;
//number
var myAge = 30;
//myAge='dab';
//boolean
var hasHobbies = false;
//hasHobbies = 1;
//assign types
var myRealAge;
myRealAge = 31;
//myRealAge = '30';
//array
var hobbies = ["Cooking", "Surfing"];
hobbies = [100];
//tuples  (defining what the array will contain)
var address = ["Quimby st", 3368];
//enum 
var Color;
(function (Color) {
    Color[Color["Gray"] = 0] = "Gray";
    Color[Color["Green"] = 100] = "Green";
    Color[Color["Blue"] = 2] = "Blue";
})(Color || (Color = {}));
var myColor = Color.Green;
console.log(myColor);
//any
var car = "BMW";
console.log(car);
car = { brand: "BMW", series: 3 };
console.log(car);
//functions
//colon after function refers to what the value will be returned
function returnMyName() {
    return myName;
}
console.log(returnMyName());
//void
function sayHello() {
    console.log('Hello');
}
//argument types
function multiply(value1, value2) {
    return value1 * value2;
}
console.log(multiply(2, 4));
//function types
//this defines what the function could hold(name of arguments ignored it is the types that are important)
var myMultiply;
// myMultiply = sayHello;
// myMultiply();
myMultiply = multiply;
console.log(myMultiply(5, 2));
//objects
var userData = {
    name: 'Dan',
    age: 30
};
// userData = {
//   a:'hello',
//   b:22
// };
//complex object
var complex = {
    data: [100, 3.99, 10],
    output: function (all) {
        return this.data;
    }
};
var complex2 = {
    data: [100, 3.99, 10],
    output: function (all) {
        return this.data;
    }
};
//union types allow the ability to define a type with 2 or more types
var myRealRealAge = 27;
myRealRealAge = "27";
//check types
var finalValue = 'A string';
if (typeof finalValue == 'string') {
    console.log('final value is number');
}
// never never returns anything
function neverReturns() {
    throw new Error('An Error!');
}
//nullable types
var canBeNull = 12;
canBeNull = null;
var canAlsoBeNull;
canAlsoBeNull = null;
var canThisBeAny = null;
canThisBeAny = 12;
