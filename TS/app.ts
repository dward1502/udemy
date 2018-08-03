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
