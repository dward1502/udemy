//string
let myName = 'Dan';
//myName =28;

//number
let myAge = 30;
//myAge='dab';

//boolean
let hasHobbies = false;
//hasHobbies = 1;

//assign types
let myRealAge:number;
myRealAge = 31;
//myRealAge = '30';

//array
let hobbies: any[] = ["Cooking","Surfing"];
hobbies = [100];

//tuples  (defining what the array will contain)
let address: [string,number] = ["Quimby st",3368];

//enum 
enum Color {
  Gray,
  Green = 100,
  Blue = 2
}
let myColor: Color = Color.Green;
console.log(myColor);

//any
let car : any = "BMW";
console.log(car);
car ={brand:"BMW", series: 3};
console.log(car);

//functions
//colon after function refers to what the value will be returned
function returnMyName(): string{
  return myName;
}
console.log(returnMyName());

//void
function sayHello(): void {
  console.log('Hello');
}
//argument types
function multiply(value1:number, value2:number): number {
  return value1 * value2;
}
console.log(multiply(2,4));

//function types
//this defines what the function could hold(name of arguments ignored it is the types that are important)
let myMultiply: (a:number, b:number) => number;
// myMultiply = sayHello;
// myMultiply();
myMultiply = multiply;
console.log( myMultiply(5,2));

//objects
let userData: {name:string ,age:number} = {
  name: 'Dan',
  age: 30
};
// userData = {
//   a:'hello',
//   b:22
// };

//complex object
let complex: {data:number[], output: (all: boolean) => number[]} = {
  data: [100,3.99,10],
  output: function(all: boolean): number [] {
    return this.data;
  }
};
//type alias
//creates a reusable type definition

type Complex =  {data:number[], output: (all: boolean) => number[]};

let complex2: Complex = {
  data: [100,3.99,10],
  output: function(all: boolean): number [] {
    return this.data;
  }
}

//union types allow the ability to define a type with 2 or more types
let myRealRealAge: number | string = 27;
myRealRealAge = "27";

//check types
let finalValue = 'A string';
if(typeof finalValue == 'string'){
  console.log('final value is number');
} 

// never never returns anything
function neverReturns():never {
  throw new Error('An Error!');
}

//nullable types
let canBeNull = 12;
canBeNull = null;
let canAlsoBeNull;
canAlsoBeNull = null;

let canThisBeAny: number | null = null;
canThisBeAny = 12;

//assignment for module
type BankCheck =  {money: number, deposit: (val: number) => void};

let bankAccount: BankCheck = {
  money: 2000,
  deposit(value){
    this.money += value;
  }
}

let myself:{name: string, bankAccount: BankCheck, hobbies: string[]} = {
  name: "Dan",
  bankAccount: bankAccount,
  hobbies: ['Sports', "Cooking"]
}
myself.bankAccount.deposit(3000);
console.log(myself);